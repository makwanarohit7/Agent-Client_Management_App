import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
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
  const { row } = props;
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.policy_id}</TableCell>
        <TableCell align="left">{row.policy_name}</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/dashboard/customer/UpdatePolicy");
            }}
          >
            Update
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/dashboard/customer/DeletePolicy");
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
  });
  return (
    <div>
      <h1>Policy</h1>
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
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Update</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row key={item.policy_id} row={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Policy;
