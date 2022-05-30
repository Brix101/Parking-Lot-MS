import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userIsAdmin } from "../feature/userReducer";
import { useGetAllUserQuery } from "../services/userService";
import Loader from "./Loader";
import SearchAppBar from "./SearchAppBar";
import Title from "./Title";
import { Button, IconButton } from "@mui/material";
import SignUp from "./SignUp/SignUp";

function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});

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
    if (userData) {
      console.log(userData);
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
              <IconButton
                color="inherit"
                onClick={() => {
                  setOpen(true);
                }}
              >
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
                          <Button
                            onClick={() => {
                              setUpdate(user);
                              setOpen(true);
                            }}
                          >
                            {user.firstName} {user.lastName}
                          </Button>
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

      <SignUp
        open={open}
        handleClose={() => {
          setUpdate({});
          setOpen(false);
        }}
        update={update}
      />
    </>
  );
}

export default User;
