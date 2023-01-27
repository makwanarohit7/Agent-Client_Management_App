import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function Assign_policy() {
  const { userId } = useParams();
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [policy, setPolicy] = useState("");

  const [date, setDate] = useState(dayjs());
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));
  console.log("Name = " + name + ", Number = " + number);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",

      redirect: "follow",
    };
    fetch("http://localhost:5000/customer/" + userId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setId(result[0].customer_id);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/policy", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, []);
  // console.log(data);
  const handelAssign = () => {};
  const handelpolicy = (event) => {
    setPolicy(event.target.value);
  };
  // console.log(policy);
  // const [value, setValue] = React.useState < DateRange < Dayjs >> [null, null];
  console.log("Name = " + name + ", Number = " + number);
  return (
    <div>
      <h1>Assign_policy</h1>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success User Data Updated
          </Alert>
        </Snackbar>
        <TextField
          fullWidth
          variant="outlined"
          label="Id Number*"
          type="number"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <br />
        <br />

        <FormControl fullWidth>
          <InputLabel>Policy*</InputLabel>
          <Select
            // value={}
            onChange={handelpolicy}
            autoWidth
            label="Policy*"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((item) => {
              return (
                <MenuItem value={item.policy_id}>{item.policy_name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "Check-in", end: "Check-out" }}
          >
            <DateRangePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider> */}
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Premium Per Month *</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Premium Per Month *"
          />
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Policy Coverage *</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Policy Coverage *"
          />
        </FormControl>
        <br />
        <br />

        <StyledPaper>
          <Grid>
            <h2>Nominess Details</h2>
            <TextField
              fullWidth
              variant="outlined"
              label="Nominess Name*"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              variant="outlined"
              label="Adhar Card Number*"
              type="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of Borth"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={(date) => {
                  setDate(date.$y + "-" + (date.$M + 1) + "-" + date.$D);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </StyledPaper>
        <br />
        <br />

        <Button variant="outlined" type="submit" onClick={handelAssign}>
          Update
        </Button>
      </div>
    </div>
  );
}

export default Assign_policy;
