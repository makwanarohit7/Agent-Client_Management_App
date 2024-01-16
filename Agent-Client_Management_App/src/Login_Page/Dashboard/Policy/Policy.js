import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Row(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { row, onDeleteClick, onhandleClick } = props;
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" style={{ fontSize: 20 }}>
          {row.policy_id}
        </TableCell>
        <TableCell align="left" style={{ fontSize: 20 }}>
          {row.policy_name}
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/dashboard/customer/UpdatePolicy/${row.policy_id}`);
            }}
          >
            Update
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              // navigate("/dashboard/customer/DeletePolicy");
              onDeleteClick(row.policy_id);
              onhandleClick();
            }}
          >
            Detele
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
function Policy() {
  const [data, setData] = useState([]);
  // console.log(data);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [dopen, setDOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:5000/policy", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, [open]);
  const handleClickdOpen = () => {
    setDOpen(true);
  };
  const handledClose = () => {
    setDOpen(false);
  };
  const handleDeleteClick = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:5000/policy/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true))
      .catch((error) => console.log("error", error));

    handledClose();
  };

  return (
    <div>
      <h1>Policy</h1>
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
              Are You Sure , You Want To Delete Policy ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handledClose}>Disagree</Button>
            <Button onClick={() => handleDeleteClick(id)}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          success Delete User
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/dashboard/customer/AddPolicy");
        }}
      >
        Add New Policy
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#514ae8" }}>
            <TableRow>
              <TableCell
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Id
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                align="left"
              >
                Update
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                align="left"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row
                key={item.policy_id}
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
export default Policy;
