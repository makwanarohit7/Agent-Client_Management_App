import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";

function UpdatePolicy() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
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

    fetch("http://localhost:5000/policy/" + userId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setId(data[0].policy_id);
        setName(data[0].policy_name);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handelupdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      policy_id: id,
      policy_name: name,
    });

    var requestOptions = {
      method: "PUT",
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
        <Button variant="outlined" type="submit" onClick={handelupdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
export default UpdatePolicy;
