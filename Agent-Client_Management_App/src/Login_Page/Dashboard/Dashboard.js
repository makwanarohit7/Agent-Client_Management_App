import Customer from "./Customer/Customer";
import Home from "./Home Page/Home";
import Policy from "./Policy/Policy";
import { Box } from "@mui/system";
import {
  AppBar,
  Avatar,
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
import DeletePolicy from "./Policy/DeletePolicy";
import UpdatePolicy from "./Policy/UpdatePolicy";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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
            style={{ backgroundColor: "Blue" }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                React {pathname}
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
            <Toolbar style={{ backgroundColor: "Blue" }} />
            <Divider />
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/dashboard/customer");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                  </ListItemIcon>
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

            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="customer/*" element={<Customer />} />
              <Route path="policy/*" element={<Policy />} />
              <Route path="/customer/AddCustomer" element={<AddCustomer />} />
              <Route
                path="/customer/UpdateCustomer/:userId"
                element={<UpdateCustomer />}
              />

              <Route path="/customer/AddPolicy" element={<AddPolicy />} />
              <Route path="/customer/UpdatePolicy" element={<UpdatePolicy />} />
              <Route path="/customer/DeletePolicy" element={<DeletePolicy />} />
            </Routes>
          </Box>
        </Box>
      </main>
    </Fragment>
  );
}
export default Dashboard;
