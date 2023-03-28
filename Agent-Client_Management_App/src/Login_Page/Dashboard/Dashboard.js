import Customer from "./Customer/Customer";
import Home from "./Home Page/Home";
import Policy from "./Policy/Policy";
import { Box } from "@mui/system";

import {
  AppBar,
  Avatar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import AddCustomer from "./Customer/AddCustomer";

import UpdateCustomer from "./Customer/UpdateCustomer";
import AddPolicy from "./Policy/AddPolicy";

import UpdatePolicy from "./Policy/UpdatePolicy";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Assign_policy from "./Assign_policy";
import Report from "./Report Page/Report";
import Show_policy from "./Show_policy";
function Dashboard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const drawerWidth = 240;

  return (
    <Fragment>
      <main>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
            style={{ backgroundColor: "#f7832a" }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                React {pathname}
                <Button
                  className="logout_button"
                  variant="contained"
                  onClick={() => {
                    sessionStorage.removeItem("Token");
                    navigate("/");
                  }}
                >
                  Log Out
                </Button>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar style={{ backgroundColor: "#f7832a", color: "white" }}>
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Toolbar>
            <Divider />
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/dashboard/customer");
                }}
              >
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Customer"} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/dashboard/policy");
                }}
              >
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Policy"} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/dashboard/report");
                }}
              >
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"Report"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/assign-policy/:userId"
                element={<Assign_policy />}
              />
              <Route path="/show-policy/:userId" element={<Show_policy />} />
              <Route path="customer/*" element={<Customer />} />
              <Route path="policy/*" element={<Policy />} />
              <Route path="/customer/AddCustomer" element={<AddCustomer />} />
              <Route
                path="/customer/UpdateCustomer/:userId"
                element={<UpdateCustomer />}
              />
              <Route path="/customer/AddPolicy" element={<AddPolicy />} />
              <Route
                path="/customer/UpdatePolicy/:userId"
                element={<UpdatePolicy />}
              />
              <Route path="/report" element={<Report />} />
            </Routes>
          </Box>
        </Box>
      </main>
    </Fragment>
  );
}
export default Dashboard;
