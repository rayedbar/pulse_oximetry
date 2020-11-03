import React from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";

const OximeterTable = ({ spo2Data }) => {
  return (
    <TableContainer component={Paper}>
      <Table style={{ width: "100%" }} aria-label="spo2 table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>SpO2</TableCell>
            <TableCell>Heart Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spo2Data.reverse().map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                {new Date(data.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(data.createdAt).toLocaleTimeString()}
              </TableCell>
              <TableCell>{data.spo2}</TableCell>
              <TableCell>{data.heartRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OximeterTable;
