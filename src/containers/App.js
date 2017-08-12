import React, { Component } from 'react';
import Select from '../components/Select';
import './App.css';
import '../components/Select/style.css';

const CustomOption = (option, props) => {
  return (
    <span {...props}>
      <span className="CustomSelect-dot" style={{ background: option.color }} />
      {option.label}
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
        <header>
          <h1>React Simple Select</h1>
          <p>
            Customisable opitons / Keyboard control / Accessbility. &nbsp; (<a
              href="https://bitbucket.org/josephj/morning-eyrie-25991/"
              rel="noopener noreferrer"
              target="_blank"
            >
              View source code on Bitbucket
            </a>)
          </p>
        </header>
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
              { value: '4', label: 'Option 4' },
              {
                value: '5',
                label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
              }
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
              { value: '4', label: 'Option 4', color: '#fd7173' },
              {
                value: '5',
                label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
                color: 'blue'
              }
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
              { value: '4', label: 'Option 4', color: '#fd7173' },
              {
                value: '5',
                label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
              }
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
        <footer>
          <ul>
            <li>
              <a href="http://career.josephj.com/resume.html" rel="noopener noreferrer" target="_blank">
                View Joseph's CV
              </a>
            </li>
            <li>
              <a
                href="https://www.evernote.com/shard/s110/sh/5bf88846-b4fd-485f-8366-8f18de27225d/dead9a7857fd5149"
                rel="noopener noreferrer"
                target="_blank"
              >
                View Joseph's Portfolio
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default App;
