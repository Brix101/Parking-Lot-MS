import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userIsAdmin } from "../feature/userReducer";
import { useGetAllUserQuery } from "../services/userService";
import Loader from "./Loader";
import SearchAppBar from "./SearchAppBar";
import Title from "./Title";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pb: 4,
};

function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isAdmin = useSelector(userIsAdmin);
  const [searchText, setSearchText] = useState("");
  const { data: userData, isLoading, error } = useGetAllUserQuery(searchText);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin", { state: "Dashboard" });
    }
    if (error) {
      console.log(error);
    }
  });

  const textChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <SearchAppBar
            text="Search Name"
            onChange={textChange}
            props={
              <IconButton color="inherit" onClick={handleOpen}>
                <AddCircleIcon color="inherit" />
              </IconButton>
            }
          />
          <React.Fragment>
            <Title>Users</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData &&
                  userData.map((user, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell align="right">{user.userName}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">
                          {user.isAdmin ? "Admin" : "Staff"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Add User
              </Typography>
              <IconButton color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </Modal>
    </>
  );
}

export default User;
