import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Show_policy() {
  const { userId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer/Alldetails/" + userId, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, []);

  // console.log(data);
  return (
    <div>
      <h1>Show Policy</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <hr />
            <h3>Details Of Policy : </h3>
            <p>Customer ID : {item.customer_id}</p>
            <p>Customer Name : {item.customer_name}</p>
            <p>Policy ID : {item.policy_id}</p>
            <p>policy_name : {item.policy_name}</p>
            <p>Customer year : {item.year}</p>
            <p>Customer StartDate : {item.StartDate}</p>
            <p>Customer EndDate : {item.EndDate}</p>
            <p>Customer sumAssred : {item.sumAssred}</p>
            <p>Customer Installment : {item.Installment}</p>
          </div>
        ))
      ) : (
        <p>No Data Found...</p>
      )}
    </div>
  );
}

export default Show_policy;
// EndDate

// Installment

// StartDate

// customer_address

// customer_birthdate

// customer_city

// customer_email
// customer_for_id

// customer_id

// customer_mobile_number

// customer_name

// customer_pan_number

// customer_pincode

// customer_policy_id

// customer_state

// policy_id

// policy_name

// sumAssred

// year

// EndDate

// Installment

// StartDate

// customer_address

// customer_birthdate

// customer_city

// customer_email

// customer_for_id

// customer_id

// customer_mobile_number

// customer_name

// customer_pan_number

// customer_pincode

// customer_policy_id

// customer_state

// policy_id

// policy_name

// sumAssred

// year
