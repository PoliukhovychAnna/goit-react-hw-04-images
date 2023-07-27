import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarStyles,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Styled.Searchbar';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const value = this.state.value;
    if (!value.trim()) {
      return;
    }

    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <SearchbarStyles>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch size="2em" />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyles>
    );
  }
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}