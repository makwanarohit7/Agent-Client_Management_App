import { Fragment } from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import SingUp from "./Login/SingUp";
import Private from "./Login/Private";
import CustomerPoral from "./Login/CustomerPortal";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singup/*" element={<SingUp />} />
        <Route path="/CustomerPortal" element={<CustomerPoral />} />
        <Route
          path="/dashboard/*"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
      </Routes>
    </Fragment>
  );
}
export default App;
