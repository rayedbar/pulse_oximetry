import React from "react";
import {  RootRef } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

const MuiDatePicker = ({ selectedDate, handleDateChange, domRef }) => {
  return (
    <RootRef rootRef={domRef}>
      <DatePicker
        disableFuture
        openTo="year"
        format="yyyy-MM-dd"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </RootRef>
  );
};

export default MuiDatePicker;
