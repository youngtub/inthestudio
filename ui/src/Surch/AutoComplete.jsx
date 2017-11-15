import {AutoComplete} from 'antd';
import React from 'react';

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
    this.resetField = this.resetField.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      suggestions: this.props.allArtists
    }, console.log('suggestions: ', this.state.suggestions))
  };

  componentWillReceiveProps() {
    console.log('suggestions: ', this.props.allArtists)
    this.setState({
      suggestions: this.props.allArtists
    }, console.log('suggestions: ', this.state.suggestions))
  }

  onChange(val){
    this.setState({
      value: val
    });
  };

  select(name) {
    this.props.SurchCb(name);
    this.resetField();
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  resetField() {
    this.setState({
      value: ''
    });
  };

  render() {
    return (
      <AutoComplete
      style={{ width: 200, zIndex: 200 }}
      dataSource={this.state.suggestions}
      placeholder="Surch Artists..."
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={this.select}
    />
    );
  }
};

export default Autocomplete;
