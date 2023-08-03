import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarStyles,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Styled.Searchbar';



export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newValue = value;
    if (!newValue.trim()) {
      return;
    }
    onSubmit(newValue);
    setValue('');
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <SearchbarStyles>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size="2em" />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyles>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}