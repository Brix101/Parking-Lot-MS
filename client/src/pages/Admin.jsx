import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";
import SideBarItems from "../components/SideBarItems";
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useGetUserQuery } from "../services/userService";
import { useLogoutMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../feature/userReducer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: "#6E77DD",
    },
  },
});

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const [user, setUser] = useState({});
  const [initial, setInitial] = useState();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { data: userData } = useGetUserQuery();
  const [logout, { data: logoutData, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
      dispatch(setLoginUser(userData.user));

      var initials =
        userData.user.firstName.charAt(0) + userData.user.lastName.charAt(0);
      setInitial(initials);
    } else {
      navigate("/login");
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      window.location.reload(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
      dispatch(setLoginUser(userData.user));

      var initials =
        userData.user.firstName.charAt(0) + userData.user.lastName.charAt(0);
      setInitial(initials);
    }
  }, [user, userData, isSuccess, navigate, logoutData, dispatch]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    logout();
    window.location.reload(false);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {location.state}
            </Typography>

            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <Typography
                variant="body2"
                component="div"
                color="inherit"
                noWrap
                onClick={handleOpenUserMenu}
                sx={{
                  flexGrow: 1,
                  paddingRight: 2,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {user && (
                  <>
                    {user.firstName} {user.lastName}
                  </>
                )}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0.5,
                    backgroundColor: "secondary.main",
                    textTransform: "uppercase",
                  }}
                  color="inherit"
                >
                  {initial}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem
                  onClick={() => {
                    navigate("/admin/account", { state: "Account" });
                    handleCloseUserMenu();
                  }}
                >
                  <ManageAccountsIcon sx={{ marginRight: 2 }} />
                  <Typography textAlign="center">Account</Typography>
                </MenuItem> */}
                <MenuItem onClick={() => logoutUser()}>
                  <LogoutIcon sx={{ marginRight: 2 }} />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <SideBarItems />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Admin;
