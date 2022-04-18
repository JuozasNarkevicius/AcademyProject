/* eslint-disable react/jsx-no-useless-fragment */
import {
  Container, Typography, List, ListItem,
  ListItemButton, Chip, CssBaseline, Box,
  Rating,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import StarIcon from '@mui/icons-material/Star';
import programService from '../services/ProgramService';
import ROUTES from '../constants/Routes';
import paginationService from '../services/genericServices/pagination';
import Pagination from '../components/layout/Pagination';
import SearchBar from '../components/dataInput/SearchBar';
import Loading from '../components/Loading';
import COLORS from '../styles/colors';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

const columns = [
  { field: 'name', headerName: 'Program name', width: 200 },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 180,
    renderCell: (params) => (
      <>
        {params.value > 0
          ? (
            <>
              <Rating
                sx={{ ml: '5px', mr: '15px' }}
                value={params.value}
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                readOnly
              />
              {params.value}
            </>
          )
          : <>Not given yet</>}
      </>
    ),
  },
];

const SharedPrograms = () => {
  const [programs, setPrograms] = useState();
  const [filteredPrograms, setfilteredPrograms] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

  const getPrograms = async () => {
    try {
      const response = await programService.getAllPublicProgramsAPI();
      setPrograms(response.data);
      console.log(response.data);
      setfilteredPrograms(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '93vh',
      paddingTop: '5rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <CssBaseline />
      <Box>
        <Typography variant="h5">Programs shared by other users</Typography>
        <SearchBar
          elements={programs}
          setFilteredElements={setfilteredPrograms}
          attribute="name"
        />
        <Box sx={{
          height: '500px',
          width: '700px',
        }}
        >
          <DataGrid
            sx={{
              backgroundColor: COLORS.ITEM,
              borderColor: COLORS.BACKGROUND,
              mt: '3rem',
            }}
            rows={paginationService.getElementsByPage(filteredPrograms, page, pageSize)}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            disableColumnFilter
            disableCOlumn
            disableSelectionOnClick
            disableColumnSelector
            onRowClick={(program) => navigate(`${ROUTES.PUBLIC_PROGRAM}/${program.id}`)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SharedPrograms;
