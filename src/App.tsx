import React from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  params: Param[];
  model: Model;
}


interface PropsTextField {
  id: number | undefined,
  type: any,
  changeModel: any,
  value: any
}

 
class TextField extends React.Component<PropsTextField> {
  constructor(props: PropsTextField) {
    super(props);
    this.state = { type: props.type, value: props.value, changeModel: props.changeModel};
  }
  render() {
    const { id, type, value, changeModel } = this.props;
    return (
      <input type={type} onChange={() => changeModel(id, value)} defaultValue={value}/>
    )
  }
}



class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { params: props.params, model: props.model };
  }

  changeModel = (id: number | undefined, text: any) => {
    const model = this.getModel();
    const newModel = model.paramValues.reduce((acc, data): any => {
      const newValue = data.paramId === id ? text : data.value;
      const newParam = { paramId: data.paramId, value: newValue };
      const newParams = [...acc.paramValues, newParam];
      return { paramValues: newParams };
    }, { paramValues: [] });
    this.setState({ params: this.state.params, model: newModel });
  }

  getModel(): Model {
    return this.state.model;
  }

  render() {
    const { params, model } = this.state;
    const { paramValues } = model;
    const style = { 'display': 'flex', 'alignItems': 'center', 'gap': '10px' };
    return (
      <div>
        {params.map(({ id, name, type }) => {
        const getParamValue = paramValues.find(({ paramId }) => paramId === id);
        return (
        <div key={id} style={style}>
          <p key={id}>{name}</p>
          <TextField id={getParamValue?.paramId} type={type} value={getParamValue?.value} changeModel={this.changeModel}/>
        </div>)
        })}
      </div>
    );
  }
}

export default ParamEditor;
