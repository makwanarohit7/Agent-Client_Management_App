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

    fetch("http://localhost:5000/customer_policy/" + userId, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("error", error));
  }, []);

  //   console.log(data);
  return (
    <div>
      <h1>Show Policy</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.policy_id}>
            <hr />
            <p>policy_id : {item.policy_id}</p>
            <p>sumAssred : {item.sumAssred}</p>
            <p>Installment : {item.Installment}</p>
            <p>year : {item.year}</p>
            <p>StartDate : {item.StartDate}</p>
            <p>EndDate : {item.EndDate}</p>
          </div>
        ))
      ) : (
        <p>No Data Found...</p>
      )}
    </div>
  );
}

export default Show_policy;
