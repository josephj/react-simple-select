import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';

class Select extends Component {
  static displayName = 'Select';

  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onChange: PropTypes.func,
    optionComponent: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    classPrefix: 'Select'
  };

  constructor(props) {
    super(props);

    this.id = _.uniqueId(`${props.classPrefix}-`);

    this.state = {
      highlightedValue: -1,
      isFocused: false,
      isMenuOpened: false
    };
  }

  componentDidMount() {
    const wrapperEl = this.refs.wrapper;

    // For non-fluid components, just use the initial width
    const isFluid = (wrapperEl.parentNode.offsetWidth === wrapperEl.offsetWidth);
    if (!isFluid) {
      wrapperEl.style.width = `${wrapperEl.offsetWidth}px`;
    }
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
    const values = options.map(option => option.value);
    let nextState = {};

    switch (e.keyCode) {
      case 9: // Tab
        if (isMenuOpened) {
          nextState = { isMenuOpened: false, isFocused: true, highlightedValue: -1 };
        }
        break;
      case 13: // Enter
        if (isMenuOpened) {
          onChange(highlightedValue);
          nextState = { isMenuOpened: false, isFocused: true, highlightedValue: -1 };
        } else {
          nextState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      case 27: // Esc
        nextState = { isMenuOpened: false, isFocused: false };
        break;
      case 38: // Up
        if (isMenuOpened) {
          const prevIndex = values.indexOf(highlightedValue);
          const nextIndex = prevIndex - 1 >= 0 ? prevIndex - 1 : options.length - 1;
          nextState = { highlightedValue: options[nextIndex].value };
        } else {
          nextState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      case 40: // Down
        if (isMenuOpened) {
          const prevIndex = values.indexOf(highlightedValue);
          const nextIndex = prevIndex + 1 !== options.length ? prevIndex + 1 : 0;
          nextState = { highlightedValue: options[nextIndex].value };
        } else {
          nextState = { isMenuOpened: true, highlightedValue: value };
        }
        break;
      default:
      // Bypass all other keydown events
    }

    if (_.size(nextState)) {
      this.setState(nextState);
      e.preventDefault();
    }
  };

  renderSelection() {
    const id = this.id;
    const { className, classPrefix, options, value, optionComponent, ...otherProps } = this.props; // eslint-disable-line
    const { highlightedValue, isFocused, isMenuOpened } = this.state;
    const selectedOption = _.find(options, { value }) || options[0];
    const ariaProps = {
      role: 'combobox',
      'aria-controls': `${id}-results`,
      'aria-expanded': isMenuOpened,
      'aria-selected': isFocused,
      'aria-haspopup': true,
      'aria-owns': `${id}-results`
    };

    if (isMenuOpened) {
      ariaProps['aria-activedescendant'] = `${id}-result-${highlightedValue}`;
    }

    return (
      <span
        tabIndex="0"
        className={cx(`${classPrefix}-selection`, { 'is-focused': isFocused })}
        onFocus={this.onSelectionFocus}
        onBlur={this.onSelectionBlur}
        onClick={this.onSelectionClick}
        {...ariaProps}
        {...otherProps}
        children={this.renderOptionChildren(selectedOption)}
      />
    );
  }

  renderOption(option) {
    const { classPrefix, value } = this.props;
    const { highlightedValue } = this.state;
    const className = cx(`${classPrefix}-option`, {
      'is-highlighted': option.value === highlightedValue,
      'is-selected': value === option.value
    });

    return (
      <li
        id={`${this.id}-result-${option.value}`}
        key={`option-${option.value}`}
        className={className}
        role="option"
        aria-selected={value === option.value}
        onClick={this.onOptionClick.bind(this, option.value)}
        onMouseOver={this.onOptionHighlight.bind(this, option.value)}
        children={this.renderOptionChildren(option)}
      />
    );
  }

  renderOptionChildren(option) {
    const { optionComponent, classPrefix } = this.props;
    const props = {
      className: `${classPrefix}-optionText`,
      title: option.label
    };

    return optionComponent
      ? optionComponent(option, props)
      : <span {...props} children={option.label}/>
  }

  render() {
    const { classPrefix, className, options } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div ref="wrapper" dir="ltr" className={cx(classPrefix, className)} onKeyDown={this.onWrapperKeyDown}>
        {this.renderSelection()}
        <ul
          id={`${this.id}-results`}
          role="listbox"
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
