import { Fragment } from "react";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Fragment>
  );
}
export default App;
