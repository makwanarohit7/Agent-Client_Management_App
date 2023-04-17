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
import { addMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function Assign_policy() {
  const { userId } = useParams();
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [policy, setPolicy] = useState();
  const [startdate, setStartDate] = useState("2023-01-01");
  // const [startDate, setStartDate] = useState("");
  const [endD, setEndD] = useState("");
  const [year, setYear] = useState("");
  const [sumAssured, setSumAssured] = useState();
  const [installment, setInstallment] = useState();
  const [result, setResult] = useState([]);
  const [c_p_id, setC_p_id] = useState("");
  const [assign, setAssign] = useState(false);
  const [getId, setGetId] = useState(false);

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

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

  useEffect(() => {
    calculateEndDate(startdate, year);
  }, [startdate, year]);

  // useEffect(() => {
  //   assign && Get_customer_policy_id();
  //   assign && generateMonthDates(startdate, year);
  // }, [assign]);

  // useEffect(() => {
  //   AssignTo_customer_policy_installment();
  // }, [getId]);

  const handelpolicy = (event) => {
    setPolicy(event.target.value);
  };

  const calculateEndDate = (startDate, year) => {
    year = parseInt(startDate.slice(0, 4)) + parseInt(year);
    // console.log(year + startDate.slice(4));
    setEndD(year + startDate.slice(4));
  };

  // const generateMonthDates = (startdate) => {
  //   const list = [];
  //   for (let index = 0; index < year * 12; index++) {
  //     // list[index] = addMonths(new Date(startdate), index).toLocaleDateString();
  //     list.push(format(addMonths(new Date(startdate), index), "yyyy-MM-dd"));
  //   }
  //   setResult(list);
  //   console.log("Date Done");
  // };

  const generateMonthDates = (startdate) => {
    return new Promise((resolve, reject) => {
      const list = [];
      for (let index = 0; index < year * 12; index++) {
        list.push(format(addMonths(new Date(startdate), index), "yyyy-MM-dd"));
      }
      console.log("Date Done");
      resolve(list);
    });
  };

  const AssignTo_customer_policy_table = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_for_id: id,
      policy_id: policy,
      sumAssred: sumAssured,
      Installment: installment,
      year: year,
      StartDate: startdate,
      EndDate: endD,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer_policy", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result), setOpen(true), setAssign(true))
      .catch((error) => console.log("error", error));
  };
  const Get_customer_policy_id = () => {
    return new Promise((resolve, reject) => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        "http://localhost:5000/customer_policy/" +
          id +
          "/" +
          policy +
          "/" +
          sumAssured +
          "/" +
          installment +
          "/" +
          year,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(data[0].customer_policy_id);
          console.log("Completed Get Id");
        })
        .catch((error) => reject(error));
    });
  };
  // const Get_customer_policy_id = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   fetch(
  //     "http://localhost:5000/customer_policy/" +
  //       id +
  //       "/" +
  //       policy +
  //       "/" +
  //       sumAssured +
  //       "/" +
  //       installment +
  //       "/" +
  //       year,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setC_p_id(data[0].customer_policy_id);
  //       console.log("Result : " + result);
  //       console.log("Completed Get Id");
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  // const AssignTo_customer_policy_installment = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   // Replace with your code to get the customer_policy_id value
  //   console.log("CPID : " + c_p_id);
  //   console.log("object : " + result);

  //   var raw = JSON.stringify({
  //     customer_policy_id: c_p_id,
  //     date: result,
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:5000/customer_policy_installment", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };
  const AssignTo_customer_policy_installment = (result, c_p_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_policy_id: c_p_id,
      date: result,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer_policy_installment", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  // const handelAssign = () => {
  //   setTimeout(() => {
  //     generateMonthDates(startdate, year);
  //   }, 1000);

  //   setTimeout(() => {
  //     AssignTo_customer_policy_table();
  //   }, 2000);

  //   setTimeout(() => {
  //     Get_customer_policy_id();
  //   }, 3000);

  //   setTimeout(() => {
  //     AssignTo_customer_policy_installment();
  //   }, 4000);
  // };
  const handelAssign = async () => {
    try {
      const result = await generateMonthDates(startdate, year);
      await AssignTo_customer_policy_table();
      const c_p_id = await Get_customer_policy_id();
      await AssignTo_customer_policy_installment(result, c_p_id);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(id);
  // console.log(policy);
  // console.log("Sum = " + sumAssured);
  // console.log("In = " + installment);
  // console.log("Y = " + year);
  // console.log("SD = " + startdate);
  // console.log("ED = " + endD);
  // console.log(result);

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
            Success User Data Saved
          </Alert>
        </Snackbar>
        <TextField
          fullWidth
          variant="outlined"
          label="Id Number*"
          type="number"
          value={id}
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
                <MenuItem value={item.policy_id} key={item.policy_id}>
                  {item.policy_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth type="number">
          <InputLabel>Sum Assured *</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Sum Assured *"
            onChange={(e) => {
              setSumAssured(e.target.value);
            }}
          />
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Installment Amount Per Mounth *</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Installment Amount Per Mounth *"
            onChange={(e) => {
              setInstallment(e.target.value);
            }}
          />
        </FormControl>
        <br />
        <br />
        <TextField
          fullWidth
          variant="outlined"
          label="Year*"
          type="number"
          inputProps={{ min: 1, max: 25, step: 1 }}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          // value={year}
          // maxLimit={25}
        />
        <br />
        <br />
        Start Date :
        <br />
        <br />
        {/* <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Enter Date*"
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
        {/* <Button
          onClick={() => {
            calculateEndDate(startdate, year);
          }}
        >
          Click
        </Button> */}
        <br />
        <br />
        <p style={{ color: "red" }}>Expriy Date : {endD}</p>
        <br />
        <br />
        <Button variant="outlined" type="submit" onClick={handelAssign}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default Assign_policy;
