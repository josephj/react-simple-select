import React, { Component } from 'react';
import Select from './components/Select/index.js';
import './components/Select/style.css';

const optionComponent = props => {
  const style = {
    display: 'inline-block',
    marginRight: '10px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: props.color
  };
  return (
    <span title={props.label}>
      <span style={style} />
      {props.label}
    </span>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue1: '1',
      selectedValue2: '2'
    };
  }
  render() {
    return (
      <div className="App">
        <label>
          <div>Customised Options</div>
          <Select
            value={this.state.selectedValue1}
            onChange={value => this.setState({ selectedValue1: value })}
            optionComponent={optionComponent}
            options={[
              { value: '1', label: 'Option 1', color: '#aee28a' },
              { value: '2', label: 'Option 2', color: '#4e92df' },
              { value: '3', label: 'Option 3', color: '#f3a536' },
              { value: '4', label: 'Option 4', color: '#fd7173' }
            ]}
          />
        </label>

        <br/><br/>

        <label>
          <div>Default Options</div>
          <Select
            value={this.state.selectedValue2}
            onChange={value => this.setState({ selectedValue2: value })}
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
              { value: '4', label: 'Option 4' }
            ]}
          />
        </label>

      </div>
    );
  }
}

export default App;
