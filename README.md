Code Practice
-------------

## Demo

https://morning-eyrie-25991.herokuapp.com/

## Options

Property        | Type    | Default  | Description
----------------|---------|----------|------------
value           | string  |          | The selected value (required)
options         | array   | []       | The dropdown options. (required)
classPrefix     | string  | 'Select' | You can use your own stylesheet with different class name prefix
className       | string  |          | Additional class name
optionComponent | element |          | You can customize the option style by using this prop. (optional)
onChange        | func    |          | onChange callback

## Example

```jsx
import React, {Component} from 'react';
import Select from '../components/Select';
import '../components/Select/style.scss'; // Default stylesheet

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1
    };
  }
  render() {
    return (
      <Select
        value={this.state.selectedValue}
        optionComponent={props => (
          <span title={props.label}>
            <span className="CustomSelect-dot" style={{background: props.color}}/>
            {props.label}
          </span>
        )}
        options=[
          {value: '1', label: 'Option 1', color: 'yellow'},
          {value: '2', label: 'Option 2', color: 'blue'},
          {value: '3', label: 'Option 3', color: 'pink'}
        ]
      />
    )
  }
}
```