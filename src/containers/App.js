import React, { Component } from 'react';
import Select from '../components/Select';
import './App.css';
import '../components/Select/style.css';

const CustomOption = props => {
  return (
    <span title={props.label}>
      <span className="CustomSelect-dot" style={{background: props.color}} />
      {props.label}
    </span>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue1: '1',
      selectedValue2: '2',
      selectedValue3: '3'
    };
  }
  render() {
    const { selectedValue1, selectedValue2, selectedValue3 } = this.state;

    return (
      <div className="App">
        <section>
          <label>Default Dropdown</label>
          <Select
            title="Default Dropdown"
            value={selectedValue2}
            onChange={value => this.setState({ selectedValue2: value })}
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
              { value: '4', label: 'Option 4' }
            ]}
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        <section>
          <label>Custom Dropdown</label>
          <Select
            title="Custom Dropdown"
            className="CustomSelect"
            value={selectedValue1}
            onChange={value => this.setState({ selectedValue1: value })}
            optionComponent={CustomOption}
            options={[
              { value: '1', label: 'Option 1', color: '#aee28a' },
              { value: '2', label: 'Option 2', color: '#4e92df' },
              { value: '3', label: 'Option 3', color: '#f3a536' },
              { value: '4', label: 'Option 4', color: '#fd7173' }
            ]}
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        <section>
          <label>Custom Dropdown - Fluid</label>
          <Select
            title="Custom Dropdown - Fluid"
            className="FluidSelect"
            value={selectedValue3}
            onChange={value => this.setState({ selectedValue3: value })}
            options={[
              { value: '1', label: 'Option 1', color: '#aee28a' },
              { value: '2', label: 'Option 2', color: '#4e92df' },
              { value: '3', label: 'Option 3', color: '#f3a536' },
              { value: '4', label: 'Option 4', color: '#fd7173' }
            ]}
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>
      </div>
    );
  }
}

export default App;
