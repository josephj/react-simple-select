import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';

class Select extends Component {
  static displayName = 'Select';

  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    isFocused: PropTypes.bool,
    isMenuOpened: PropTypes.bool,
    onChange: PropTypes.func,
    optionComponent: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    classPrefix: 'Select',
    isFocused: false,
    isMenuOpened: false
  };

  constructor(props) {
    super(props);

    this.id = _.uniqueId(`${props.classPrefix}-`);

    this.state = {
      highlightedValue: -1,
      isFocused: props.isFocused,
      isMenuOpened: props.isMenuOpened
    };
  }

  handleClickOutside = () => {
    this.setState({
      highlightedValue: -1,
      isMenuOpened: false,
      isFocused: false
    });
  };

  onOptionClick = value => {
    this.setState({
      isMenuOpened: false,
      isFocused: true
    });

    this.props.onChange(value);
  };

  onOptionHighlight = value => {
    this.setState({
      highlightedValue: value
    });
  };

  onSelectionBlur = () => {
    this.setState({
      isFocused: false
    });
  };

  onSelectionClick = () => {
    this.setState({
      highlightedValue: -1,
      isFocused: true,
      isMenuOpened: true
    });
  };

  onSelectionFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  onWrapperKeyDown = e => {
    const { options, onChange, value } = this.props;
    const { isMenuOpened, highlightedValue } = this.state;
    let newState = {};

    switch (e.keyCode) {
      case 9: // Tab
        if (isMenuOpened) {
          newState = { isMenuOpened: false, isFocused: false, highlightedValue: -1 };
        }
        break;
      case 13: // Enter
        if (isMenuOpened) {
          onChange(highlightedValue);
          newState = { isMenuOpened: false, isFocused: true, highlightedValue: -1 };
        } else {
          newState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      case 27: // ESC
        newState = { isMenuOpened: false, isFocused: false };
        break;
      case 38: // Up
        if (isMenuOpened) {
          const prevIndex = options.map(option => option.value).indexOf(highlightedValue);
          const nextIndex = prevIndex - 1 >= 0 ? prevIndex - 1 : options.length - 1;
          newState = { highlightedValue: options[nextIndex].value };
        } else {
          newState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      case 40: // Down
        if (isMenuOpened) {
          const prevIndex = options.map(option => option.value).indexOf(highlightedValue);
          const nextIndex = prevIndex + 1 !== options.length ? prevIndex + 1 : 0;
          newState = { highlightedValue: options[nextIndex].value };
        } else {
          newState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      default:
      // ?
    }

    if (_.size(newState)) {
      this.setState(newState);
      e.preventDefault();
    }
  };

  renderSelection() {
    const id = this.id;
    const { classPrefix, options, optionComponent, value } = this.props;
    const { highlightedValue, isFocused, isMenuOpened } = this.state;
    const selectedOption = _.find(options, { value }) || options[0];
    const ariaProps = {
      role: 'combobox',
      'aria-haspopup': true,
      'aria-expanded': isMenuOpened,
      'aria-owns': `${id}-results`,
      'aria-controls': `${id}-results`,
      'aria-labelledby': `${id}-container`
    };

    if (isMenuOpened) {
      ariaProps['aria-activedescendant'] = `${id}-result-${highlightedValue}`;
    }

    let children;
    if (optionComponent) {
      children = optionComponent(selectedOption);
    } else {
      children = (
        <span title={selectedOption.label} id={`${this.id}-container`}>
          {selectedOption.label}
        </span>
      );
    }

    return (
      <span
        tabIndex="0"
        className={cx(`${classPrefix}-selection`, { 'is-focused': isFocused })}
        onFocus={this.onSelectionFocus}
        onBlur={this.onSelectionBlur}
        onClick={this.onSelectionClick}
        {...ariaProps}
        children={children}
      />
    );
  }

  renderOption(option, i) {
    const { classPrefix, optionComponent, value } = this.props;
    const { highlightedValue } = this.state;
    const children = optionComponent ? optionComponent(option) : <span title={option.label}>{option.label}</span>;
    const className = cx(`${classPrefix}-option`, {
      'is-highlighted': option.value === highlightedValue,
      'is-selected': value === option.value
    });

    return (
      <li
        id={`${this.id}-result-${option.value}`}
        key={`option-${option.value}`}
        className={className}
        role="treeitem"
        aria-selected={value === option.value}
        onClick={this.onOptionClick.bind(this, option.value)}
        onMouseOver={this.onOptionHighlight.bind(this, option.value)}
        children={children}
      />
    );
  }

  render() {
    const { classPrefix, className, options } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div dir="ltr" className={cx(classPrefix, className)} onKeyDown={this.onWrapperKeyDown}>
        {this.renderSelection()}
        <ul
          id={`${this.id}-results`}
          role="tree"
          className={cx(`${classPrefix}-dropdown`, { 'is-hidden': !isMenuOpened })}
          aria-expanded={isMenuOpened}
          aria-hidden={!isMenuOpened}
        >
          {options.map(this.renderOption.bind(this))}
        </ul>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Select);
