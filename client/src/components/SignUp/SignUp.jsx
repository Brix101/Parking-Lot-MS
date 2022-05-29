import {
  Alert,
  AlertTitle,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonalInfo from "./PersonalInfo";
import PasswordForm from "./PasswordForm";
import React, { useState } from "react";
import { useAddUserMutation } from "../../services/userService";
import Loader from "../Loader";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const steps = ["Personal Information", "Private Information"];

function SignUp({ open, handleClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passConfirm: "",
    isAdmin: false,
  });

  const [addUser, { data, error, isLoading, isSuccess, isError }] =
    useAddUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passConfirm: "",
        isAdmin: false,
      });
    }

    if (isError) {
      setActiveStep(0);
    }
  }, [isSuccess, isError]);

  const handleNext = (e) => {
    if (e.target.type === "submit") {
      addUser(state);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const close = () => {
    handleClose();
    setActiveStep(0);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalInfo state={state} handleChange={handleChange} />;
      case 1:
        return <PasswordForm state={state} handleChange={handleChange} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add User
            </Typography>
            <IconButton color="inherit" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {isLoading && <Loader />}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.data.message}
          </Alert>
        )}
        <Container component="main" maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Success
                  </Typography>
                  <Typography variant="subtitle1">
                    {data && data.message}
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 1, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, ml: 1 }}
                      type={
                        activeStep === steps.length - 1 ? "submit" : "button"
                      }
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}

export default SignUp;
