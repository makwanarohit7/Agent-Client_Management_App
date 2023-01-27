import { Alert, Button, Dialog, Snackbar, TextField } from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
function AddCustomer() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pan_number, setPan_number] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState(dayjs());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  function handelcreate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: id,
      name: name,
      pan_number: pan_number,
      city: city,
      state: state,
      address: address,
      pincode: pincode,
      birthdate: date,
      // birthdate: value.$y + "-" + (value.$M + 1) + "-" + value.$D,
      mobile_number: phone,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));
  }
  // console.log(date);
  const handleClose = () => {
    setOpen(false);
  };
  // const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  // console.log(value.$y + "-" + (value.$M + 1) + "-" + value.$D);
  return (
    <div>
      <h1>Create New Customer</h1>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success New User Added
          </Alert>
        </Snackbar>
        <TextField
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
        <TextField
          variant="outlined"
          label="Name*"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Pan Number*"
          type="text"
          value={pan_number}
          onChange={(e) => {
            setPan_number(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="City*"
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="State*"
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Address*"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="PinCode*"
          type="number"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
          }}
        />
        <br />
        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={date}
            onChange={(date) => {
              setDate(date.$y + "-" + (date.$M + 1) + "-" + date.$D);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Mobile Number*"
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Email*"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="outlined" type="submit" onClick={handelcreate}>
          Add New
        </Button>
      </div>
    </div>
  );
}
export default AddCustomer;
// "customer_id": 1,
// "customer_name": "Rohit",
// "customer_pan_number": "GJRPM9625M",
// "customer_city": "Keshod",
// "customer_state": "Gujarat",
// "customer_address": "Keshod",
// "customer_pincode": "362220",
// "customer_birthdate": "2002-10-06T18:30:00.000Z",
// "customer_mobile_number": "9173493449",
// "customer_email": "makawana@gmail.com"
