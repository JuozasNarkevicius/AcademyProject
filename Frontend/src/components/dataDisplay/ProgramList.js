import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import baseAdress from '../../API/BaseAddress';

const ProgramList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    await axios.get(`${baseAdress}/users/1/programs`)
      .then((result) => setData(result.data));
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <TableContainer>
      <Table sx={{ m: '50px', width: '90%' }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Program name</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            data.map((p) => (
              <StyledTableRow key={p.id} onClick={() => navigate('/nice')}>
                <StyledTableCell>{p.name}</StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProgramList;
