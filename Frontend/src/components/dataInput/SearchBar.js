/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SearchBarMUI from 'material-ui-search-bar';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import COLORS from '../../styles/colors';

const SearchBar = ({
  elements, setFilteredElements, attribute,
}) => {
  const [searched, setSearched] = useState();

  const requestSearch = (value) => {
    let filtered = [];
    if (attribute === 'fullName') {
      filtered = elements.filter((element) => `${element.firstName} ${element.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase()));
    } else {
      filtered = elements.filter((element) => element[attribute]
        .toLowerCase()
        .includes(value.toLowerCase()));
    }
    setFilteredElements(filtered);
  };

  const cancelSearch = () => {
    setSearched();
    setFilteredElements(elements);
  };

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', m: '2rem',
    }}
    >
      <SearchBarMUI
        sx={{ minWidth: '500px' }}
        style={{ backgroundColor: COLORS.ITEM, color: COLORS.TEXT }}
        value={searched}
        onChange={(value) => requestSearch(value)}
        onCancelSearch={cancelSearch}
        searchIcon={<SearchIcon sx={{ color: COLORS.TEXT }} />}
        closeIcon={<ClearIcon sx={{ color: COLORS.TEXT }} />}
      />
    </Box>
  );
};

SearchBar.propTypes = {
  elements: PropTypes.arrayOf(Object).isRequired,
  setFilteredElements: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
};

export default SearchBar;
