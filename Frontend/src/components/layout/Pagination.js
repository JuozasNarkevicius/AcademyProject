import React from 'react';
import { Box } from '@mui/material';
import PaginationMUI from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import paginationService from '../../services/genericServices/pagination';

const Pagination = ({ elements, pageSize, handlePageChange }) => (
  <Box sx={{
    display: 'flex', justifyContent: 'center',
  }}
  >
    <PaginationMUI
      sx={{ position: 'fixed', bottom: 30 }}
      count={paginationService.getPageCount(elements, pageSize)}
      shape="rounded"
      onChange={handlePageChange}
    />
  </Box>
);

Pagination.propTypes = {
  elements: PropTypes.arrayOf(Object).isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
