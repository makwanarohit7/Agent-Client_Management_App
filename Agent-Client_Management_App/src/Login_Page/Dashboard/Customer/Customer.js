import {
  Alert,
  Button,
  Collapse,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Row(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { row, onDeleteClick, onhandleClick } = props;
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
              onhandleClick();
            }}
          >
            Detele
          </Button>
          <></>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/dashboard/customer/UpdateCustomer/${row.customer_id}`);
            }}
          >
            Update
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/dashboard/assign-policy/${row.customer_id}`);
            }}
          >
            Assign Policy
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/dashboard/show-policy/${row.customer_id}`);
            }}
          >
            Show Policy
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
  const [searchButton, setSearchButton] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [dopen, setDOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/customer/" + search, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
    setSearchButton(false);
    // console.log("call");
  }, [open, searchButton]);

  const handleDeleteClick = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`http://localhost:5000/customer/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));

    handledClose();
  };
  const handleClickdOpen = () => {
    setDOpen(true);
  };
  const handledClose = () => {
    setDOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = () => {
    setSearchButton(true);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          success Delete User
        </Alert>
      </Snackbar>
      <h1>Customer Details</h1>
      <div>
        <Dialog
          open={dopen}
          onClose={handledClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure , You Want To Delete User ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handledClose}>Disagree</Button>
            <Button onClick={() => handleDeleteClick(id)}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
      <TextField
        variant="outlined"
        label="Search ID*"
        type="number"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        <SearchIcon />
      </Button>
      <br />
      <br />
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
              <TableCell align="left">Action Performed</TableCell>
              <TableCell align="left">Assign Policy</TableCell>
              <TableCell align="left">Show Policy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row
                key={item.customer_id}
                row={item}
                onDeleteClick={(id) => setId(id)}
                onhandleClick={handleClickdOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Customer;
