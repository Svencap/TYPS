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

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { params: props.params, model: props.model };
  }

  changeModel = (id: number | undefined, text: string) => {
    const model = this.getModel();
    const newModel = model.paramValues.reduce((acc, data): any => {
      const newValue = data.paramId === id ? text : data.value;
      const newParam = { paramId: data.paramId, value: newValue };
      const newParams = [...acc.paramValues, newParam];
      return { paramValues: newParams };
    }, { paramValues: [] });
    return this.setState({ params: this.state.params, model: newModel });
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
        {params.map(({ id, name }) => {
        const getParamValue = paramValues.find(({ paramId }) => paramId === id);
        return (
        <div key={id} style={style}>
          <p key={id}>{name}</p>
          <input type="text" onBlur={({ target }) => this.changeModel(getParamValue?.paramId, target.value)} defaultValue={getParamValue?.value}/>
        </div>)
        })}
      </div>
    );
  }
}

export default ParamEditor;
