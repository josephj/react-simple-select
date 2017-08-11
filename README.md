Code Practice
-------------


* Demo - https://morning-eyrie-25991.herokuapp.com/
* `value` - The selected value (required)
* `options` - The dropdown options. (required)
* `optionComponent` - You can customize the option style by using this prop.

```jsx
import React, {Component} from 'react';
import Select from 'components/Select';
import 'components/style.scss';

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
          <span>
            <span style={{
              display: 'inline-block',
              marginRight: '10px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: props.color}}/>
            {props.label}
          </span>
        )}
        options=[
          {value: '1', label: 'Option 1', color: 'yellow'},
          {value: '2', label: 'Option 2', color: 'blue'},
          {value: '3', label: 'Option 3', color: 'pink'},
        ]
      />
    )
  }
}
```