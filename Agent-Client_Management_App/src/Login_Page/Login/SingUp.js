import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function SingUp() {
  const [number, setNumber] = useState("");
  const [cID, setCID] = useState("");
  const [data, setData] = useState();
  const theme = createTheme();
  const navigate = useNavigate();
  const handelLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: cID,
      customer_number: number,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/customer/login", requestOptions)
      .then((res) => {
        // console.log(res);
        if (res.status >= 400) {
          throw new Error("Unvaild Username and Password!");
        }
        return res.json();
      })
      .then(
        (data) => {
          setData(data);
        },
        (err) => {
          alert(err);
        }
      );
  };

  // console.log(data);
  return (
    <div>
      {data ? (
        <div>
          <h1>Welcome to Customer Portal</h1>
          <hr />
          <h2>Customer Details...</h2>
          <p>Customer Id : {data[0].customer_id}</p>
          <p>Customer Name : {data[0].customer_name}</p>
          <p>Customer Pan_number : {data[0].customer_pan_number}</p>
          <p>Customer City : {data[0].customer_city}</p>
          <p>Customer State : {data[0].customer_state}</p>
          <p>Customer Address : {data[0].customer_address}</p>
          <p>Customer Pincode : {data[0].customer_pincode}</p>
          <p>Customer Birthdate : {data[0].customer_birthdate}</p>
          <p>Customer Mobile Number : {data[0].customer_mobile_number}</p>
          <p>Customer Email : {data[0].customer_email}</p>
          <hr />
          {data.map((item, index) => (
            <div key={index}>
              <h2>Policy Detail : {index + 1}</h2>
              <p>Customer policy_id : {item.policy_id}</p>
              <p>Customer policy_name : {item.policy_name}</p>
              <p>Customer year : {item.year}</p>
              <p>Customer StartDate : {item.StartDate}</p>
              <p>Customer EndDate : {item.EndDate}</p>
              <p>Customer sumAssred : {item.sumAssred}</p>
              <p>Customer Installment : {item.Installment}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Customer Login Portal
                </Typography>
                <Box
                  component="form"
                  onSubmit={handelLogin}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    type={"number"}
                    onChange={(e) => {
                      setCID(e.target.value);
                    }}
                    label="Customer ID*"
                    fullWidth
                  />
                  <TextField
                    margin="normal"
                    type={"number"}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    label="Mobile Number*"
                    fullWidth
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handelLogin}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}

export default SingUp;
