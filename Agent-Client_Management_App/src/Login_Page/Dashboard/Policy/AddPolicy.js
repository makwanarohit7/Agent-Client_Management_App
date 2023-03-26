import { Alert, Button, Dialog, Snackbar, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
function AddPolicy() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handelcreate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      policy_id: id,
      policy_name: name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/policy", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <h1>Create New Policy</h1>
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
          label="Name*"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
export default AddPolicy;
