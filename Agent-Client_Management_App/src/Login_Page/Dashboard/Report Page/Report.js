import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

function Report() {
  const [startdate, setStartDate] = useState(dayjs());
  const [enddate, setEndDate] = useState(dayjs());
  console.log("S-D == " + startdate + "  E-D == " + enddate);
  return (
    <div>
      <h1>Report Generation</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Start Date*"
          inputFormat="DD/MM/YYYY"
          value={startdate}
          onChange={(startdate) => {
            setStartDate(
              startdate.$y + "-" + (startdate.$M + 1) + "-" + startdate.$D
            );
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <p>To</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="End Date*"
          inputFormat="DD/MM/YYYY"
          value={enddate}
          onChange={(enddate) => {
            setEndDate(enddate.$y + "-" + (enddate.$M + 1) + "-" + enddate.$D);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <br />
      <br />
      <Button variant="outlined" type="submit">
        Show
      </Button>
      <h3>Report.....</h3>
    </div>
  );
}
export default Report;
