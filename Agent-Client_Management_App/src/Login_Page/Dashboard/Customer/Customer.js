import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import AddCustomer from "./AddCustomer";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Row(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { row, onDeleteClick } = props;
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.customer_id}</TableCell>
        <TableCell align="left">{row.customer_name}</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              onDeleteClick(row.customer_id);
            }}
          >
            Detele
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <h5>Details</h5>
                <ul>
                  <li>Pan Number : {row.customer_pan_number}</li>
                  <li>City : {row.customer_city}</li>
                  <li>State : {row.customer_state}</li>
                  <li>Address : {row.customer_address}</li>
                  <li>Pincode : {row.customer_pincode}</li>
                  <li>BirthDate : {row.customer_birthdate.split("T18:")[0]}</li>
                  <li>Mobile Number : {row.customer_mobile_number}</li>
                  <li>Email : {row.customer_email}</li>
                </ul>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(
                      `/dashboard/customer/UpdateCustomer/${row.customer_id}`
                    );
                  }}
                >
                  Update
                </Button>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
function Customer() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/customer", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, [open]);

  const handleDeleteClick = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`http://localhost:5000/customer/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          success Delete User
        </Alert>
      </Snackbar>
      <h1>Customer Details</h1>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/dashboard/customer/AddCustomer");
        }}
      >
        Add New Customer
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row
                key={item.customer_id}
                row={item}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Customer;
