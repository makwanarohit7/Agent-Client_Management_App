import { Fragment } from "react";
import Login from "./Login";
import User from "./User";
import Deshboard from "./Deshboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/deshboard" element={<Deshboard />} />
      </Routes>
    </Fragment>
  );
}
export default App;
