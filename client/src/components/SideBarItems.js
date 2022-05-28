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

function SideBarItems() {
  const isAdmin = useSelector(userIsAdmin);
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
            <SideButton to="/admin/User" icon={<PeopleIcon />} text="User" />
          )}
        </React.Fragment>

        <Divider sx={{ my: 1 }} />
        <React.Fragment>
          <ListSubheader component="div" inset>
            Saved reports
          </ListSubheader>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
          </ListItemButton>
        </React.Fragment>
      </List>
    </>
  );
}

export default SideBarItems;
