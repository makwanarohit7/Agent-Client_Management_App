import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
function UpdateCustomer() {
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
  const [dv, setDv] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { userId } = useParams();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer/" + userId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0].customer_birthdate.split("T18:")[0]);
        setId(data[0].customer_id);
        setName(data[0].customer_name);
        setPan_number(data[0].customer_pan_number);
        setCity(data[0].customer_city);
        setState(data[0].customer_state);
        setAddress(data[0].customer_address);
        setPincode(data[0].customer_pincode);
        setDate(data[0].customer_birthdate.split("T18:")[0]);
        setPhone(data[0].customer_mobile_number);
        setEmail(data[0].customer_email);
        setDv(data[0].customer_birthdate);
      })
      .catch((error) => console.log("error", error));
  }, []);
  // console.log(dv);
  // const [value, setValue] = useState(dayjs(dv));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  const handelupdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
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
      customer_id: id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <h1>Update</h1>
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
        <Button variant="outlined" type="submit" onClick={handelupdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
export default UpdateCustomer;
