import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";

function Report() {
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [cID, setCID] = useState("");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/customer_policy_installment/dates/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, []);

  const FilterDate = (startdate, enddate) => {
    // console.log("S-D == " + startdate + "  E-D == " + enddate);
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);

    const filteredData = data.map((obj) => {
      const filteredDates = obj.date.split(",").filter((date) => {
        const dateObj = new Date(date);
        return dateObj >= startDate && dateObj <= endDate;
      });

      return {
        customer_policy_id: obj.customer_policy_id,
        customer_id: obj.customer_id,
        customer_name: obj.customer_name,
        customer_mobile_number: obj.customer_mobile_number,
        customer_email: obj.customer_email,
        date: filteredDates.join(","),
      };
    });
    setNewDate(filteredData);
  };
  // const Get_customer_id = (id) => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   fetch("http://localhost:5000/customer_policy/CID/" + id, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setCID(data[0].customer_for_id))
  //     .catch((error) => console.log("error", error));
  // };
  // const Get_customer_Details = (cID) => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   fetch("http://localhost:5000/customer/detail/" + cID, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setCustomerDetails(data))
  //     // .then((data) => console.log(data[0]))
  //     .catch((error) => console.log("error", error));
  // };

  // useEffect(() => {
  //   if (cID) {
  //     Get_customer_Details(cID);
  //   }
  // }, [cID]);
  // const Get_Name = (id) => {
  //   Get_customer_id(id);
  //   return customerDetails.length > 0 ? (
  //     <>
  //       <p>Customer Name : {customerDetails[0].customer_name}</p>
  //       <p>
  //         Customer Mobile Number : {customerDetails[0].customer_mobile_number}
  //       </p>
  //       <p>Customer Email : {customerDetails[0].customer_email}</p>
  //     </>
  //   ) : (
  //     <p>No Data Found...</p>
  //   );
  // };

  // console.log(newDate);
  // console.log(data);
  // console.log(cID);
  // console.log(customerDetails);
  // console.log("test");
  return (
    <div
      style={{
        marginLeft: 150,
      }}
    >
      <h1>Report Generation</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Start Date*"
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
      <p>To</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="End Date*"
          inputFormat="DD/MM/YYYY"
          value={enddate}
          onChange={(enddate) => {
            setEndDate(enddate.$y + "-" + (enddate.$M + 1) + "-" + enddate.$D);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <br />
      <br />

      <Button
        variant="outlined"
        type="submit"
        onClick={() => {
          FilterDate(startdate, enddate);
        }}
      >
        Show
      </Button>

      <h2>Generated Report</h2>
      {newDate.length > 0 ? (
        newDate.map(
          (item, index) =>
            item.date && (
              <div key={item.customer_policy_id}>
                <hr />
                <p>Name: {item.customer_name}</p>
                <p>Customer ID: {item.customer_id}</p>
                <p>Mobile: {item.customer_mobile_number}</p>
                <p>Email: {item.customer_email}</p>
                <p>Dates: {item.date}</p>
              </div>
            )
        )
      ) : (
        <p>No Data Found...</p>
      )}
    </div>
  );
}
export default Report;
