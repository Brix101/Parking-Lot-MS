import * as React from "react";
import Divider from "@mui/material/Divider";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SideButton from "./Button/SideButton";
import { useSelector } from "react-redux";
import { userIsAdmin } from "../feature/userReducer";
import { server } from "../constant/server";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function SideBarItems() {
  const navigate = useNavigate();
  const isAdmin = useSelector(userIsAdmin);
  const handleDownload = async () => {
    await fetch(`${server}/api/report`);
  };
  return (
    <>
      <List component="nav">
        <React.Fragment>
          <SideButton to="/admin" icon={<DashboardIcon />} text="Dashboard" />
          <SideButton
            to="/admin/parking"
            icon={<BarChartIcon />}
            text="Parking Logs"
          />
          <SideButton
            to="/admin/parker"
            icon={<DirectionsCarIcon />}
            text="Parkers"
          />
          <SideButton
            to="/admin/parking-spot"
            icon={<LocalParkingIcon />}
            text="Parking Spot"
          />
          {isAdmin && (
            <SideButton to="/admin/user" icon={<PeopleIcon />} text="User" />
          )}
        </React.Fragment>

        <Divider sx={{ my: 1 }} />
        <React.Fragment>
          <ListSubheader component="div" inset>
            Saved reports
          </ListSubheader>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="View Home" />
          </ListItemButton>
          <ListItemButton onClick={handleDownload}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Generate Report" />
          </ListItemButton>
        </React.Fragment>
      </List>
    </>
  );
}

export default SideBarItems;
