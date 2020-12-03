import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Typography,
} from "@material-ui/core";

const PulseOximetryTable = ({ pulseOximetryData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return pulseOximetryData.length > 0 ? (
    <TableContainer component={Paper}>
      <Table style={{ width: "100%" }} aria-label="SpO2 table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">SpO2</TableCell>
            <TableCell align="center">Heart Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pulseOximetryData
            .slice(
              currentPage * rowsPerPage,
              currentPage * rowsPerPage + rowsPerPage
            )
            .map((data) => (
              <TableRow key={data.id}>
                <TableCell align="center">
                  {new Date(data.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(data.createdAt).toLocaleTimeString()}
                </TableCell>
                <TableCell align="center">{data.spO2}</TableCell>
                <TableCell align="center">{data.heartRate}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={pulseOximetryData.length}
        page={currentPage}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  ) : (
    <Typography>No Data</Typography>
  );
};

export default PulseOximetryTable;
