import React from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string | number;
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

interface ParamEditorProps {
  id?: number,
  value: string | number | undefined,
  type?: string | undefined,
  changeModel: any
}

 
class StringParamEditor extends React.Component<ParamEditorProps> {
  render() {
    return (
      <input type="text" defaultValue={this.props.value} onChange={({ target }) => this.props.changeModel(this.props.id, target.value)} />
    )
  }
}

class NumberParamEditor extends React.Component<ParamEditorProps> {
  render() {
    return (
      <input type="number" defaultValue={this.props.value} onChange={({ target }) => this.props.changeModel(this.props.id, target.value)} />
    )
  }
}


class SingleParamEditor extends React.Component<ParamEditorProps> {
  render() {
    const { id, type, value, changeModel } = this.props;
    switch(type) {
      case 'string': return (<StringParamEditor id={id} value={value} changeModel={changeModel} />);
      case 'number': return (<NumberParamEditor id={id} value={value} changeModel={changeModel} />);
      case 'DWORD': return (<NumberParamEditor id={id} value={value} changeModel={changeModel} />);
      default:
        throw new Error(`Unknown ${type} type`);
    }
  }
}



class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { params: props.params, model: props.model };
  }
  
  changeModel = (id: number, value: string | number): void => {
    const model = this.getModel();
    const newModel = model.paramValues.reduce((acc, data): any => {
      const newValue = data.paramId === id ? value : data.value;
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
          <SingleParamEditor id={getParamValue?.paramId} type={type} value={getParamValue?.value} changeModel={this.changeModel}/>
        </div>)
        })}
      </div>
    );
  }
}

export default ParamEditor;
