import React from "react";
import { DatePicker } from "@material-ui/pickers";

const MuiDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      disableFuture
      openTo="year"
      format="yyyy-MM-dd"
      label="Date of birth"
      views={["year", "month", "date"]}
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default MuiDatePicker;
