import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";
import Loader from "../components/Loader";
import { createTheme, Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import LoginIcon from "@mui/icons-material/Login";
//TODO: CHANGE TO IP OF  RASPI

const theme = createTheme();

function Home() {
  const navigate = useNavigate();
  const {
    data: parkingSpots,
    error,
    isLoading,
  } = useGetAllParkingSpotQuery({
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    console.log(parkingSpots);
  }, [parkingSpots]);

  const status = (block, code) => {
    const spot = parkingSpots.find(
      (spot) => spot.spotCode === code && spot.blockCode === block
    );
    if (spot) {
      return spot.isAvailable ? "green" : "red";
    }
    return "grey";
  };
  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Fab
            variant="extended"
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 500,
            }}
            onClick={() => navigate("/login")}
          >
            <LoginIcon sx={{ mr: 1 }} />
            Login
          </Fab>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100vh"
              fill="none"
              viewBox="0 0 1440 1024"
            >
              <g className="Final" clipPath="url(#a)">
                <path fill="#fff" d="M0 0h1440v1024H0z" />
                <g className="Spots">
                  <g className="B_30">
                    <path
                      fill={status("B_30", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1369.83 17.5h65.667v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_30", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1299.17 17.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_30", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1228.5 17.5h65.667v125H1228.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_29">
                    <path
                      fill={status("B_29", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1129.83 17.5h65.667v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_29", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1059.17 17.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_29", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M988.5 17.5h65.667v125H988.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_28">
                    <path
                      fill={status("B_28", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M888.833 17.5H954.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_28", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M818.167 17.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_28", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M747.5 17.5h65.667v125H747.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_27">
                    <path
                      fill={status("B_27", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M629.833 17.5H695.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_27", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M559.167 17.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_27", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M488.5 17.5h65.667v125H488.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_26">
                    <path
                      fill={status("B_26", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M386.833 15.5H452.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_26", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M316.167 15.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_26", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M245.5 15.5h65.667v125H245.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_25">
                    <path
                      fill={status("B_25", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M143.833 17.5H209.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_25", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M73.167 17.5h65.667v125H73.167z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_25", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M2.5 17.5h65.667v125H2.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_24">
                    <path
                      fill={status("B_24", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M102.5 245.5h65.667v125H102.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_23">
                    <path
                      fill={status("B_23", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M219.5 245.5h65.667v125H219.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_23", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M290.167 245.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_23", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M360.833 245.5H426.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_22">
                    <path
                      fill={status("B_22", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M488.5 245.5h65.667v125H488.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_22", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M559.167 245.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_22", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M629.833 245.5H695.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_21">
                    <path
                      fill={status("B_21", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M747.5 245.5h65.667v125H747.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_21", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M818.167 245.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_21", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M888.833 245.5H954.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_20">
                    <path
                      fill={status("B_20", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1016.5 245.5h65.667v125H1016.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_20", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1087.17 245.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_20", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1157.83 245.5h65.667v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_19">
                    <path
                      fill={status("B_19", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1271.5 245.5h65.667v125H1271.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_18">
                    <path
                      fill={status("B_18", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1271.5 396.5h65.667v125H1271.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_17">
                    <path
                      fill={status("B_17", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1157.83 396.5h65.667v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_17", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1087.17 396.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_17", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1016.5 396.5h65.667v125H1016.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_16">
                    <path
                      fill={status("B_16", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M888.833 396.5H954.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_16", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M818.167 396.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_16", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M747.5 396.5h65.667v125H747.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_15">
                    <path
                      fill={status("B_15", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M629.833 396.5H695.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_15", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M559.167 396.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_15", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M488.5 396.5h65.667v125H488.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_14">
                    <path
                      fill={status("B_14", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M360.833 396.5H426.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_14", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M290.167 396.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_14", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M219.5 396.5h65.667v125H219.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_13">
                    <path
                      fill={status("B_13", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M102.5 396.5h65.667v125H102.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_12">
                    <path
                      fill={status("B_12", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M102.5 624.5h65.667v125H102.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_11">
                    <path
                      fill={status("B_11", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M219.5 624.5h65.667v125H219.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_11", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M290.167 624.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_11", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M360.833 624.5H426.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_10">
                    <path
                      fill={status("B_10", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M559.167 624.5h65.667v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_10", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M488.5 624.5h65.667v125H488.5z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_10", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M629.833 624.5H695.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_9">
                    <path
                      fill={status("B_9", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M747.5 624.5h65.667v125H747.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_9", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M818.167 624.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_9", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M888.833 624.5H954.5v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_8">
                    <path
                      fill={status("B_8", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1016.5 624.5h65.667v125H1016.5z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_8", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1087.17 624.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_8", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1157.83 624.5h65.667v125h-65.667z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_7">
                    <path
                      fill={status("B_7", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1271.5 624.5h65.667v125H1271.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_6">
                    <path
                      fill={status("B_6", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1271.5 775.5h65.667v125H1271.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_5">
                    <path
                      fill={status("B_5", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1157.83 775.5h65.667v125h-65.667z"
                      className="sp13"
                    />
                    <path
                      fill={status("B_5", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1087.17 775.5h65.667v125h-65.667z"
                      className="sp12"
                    />
                    <path
                      fill={status("B_5", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M1016.5 775.5h65.667v125H1016.5z"
                      className="sp11"
                    />
                  </g>
                  <g className="B_4">
                    <path
                      fill={status("B_4", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M888.833 775.5H954.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_4", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M818.167 775.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_4", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M747.5 775.5h65.667v125H747.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_3">
                    <path
                      fill={status("B_3", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M629.833 775.5H695.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_3", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M559.167 775.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_3", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M488.5 775.5h65.667v125H488.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_2">
                    <path
                      fill={status("B_2", "sp3")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M360.833 775.5H426.5v125h-65.667z"
                      className="sp3"
                    />
                    <path
                      fill={status("B_2", "sp2")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M290.167 775.5h65.667v125h-65.667z"
                      className="sp2"
                    />
                    <path
                      fill={status("B_2", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M219.5 775.5h65.667v125H219.5z"
                      className="sp1"
                    />
                  </g>
                  <g className="B_1">
                    <path
                      fill={status("B_1", "sp1")}
                      stroke="#000"
                      strokeWidth="5"
                      d="M102.5 775.5h65.667v125H102.5z"
                      className="sp1"
                    />
                  </g>
                </g>
                <g className="Layout">
                  <g className="Road">
                    <path
                      fill="#D9D9D9"
                      d="M0 903h1440v100H0z"
                      className="lower"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M0 524h1440v100H0z"
                      className="center"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M0 143h1440v100H0z"
                      className="upper"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M0 145h100v858H0z"
                      className="left"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M1340 145h100v858h-100z"
                      className="right"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M801 905h100v134H801z"
                      className="entrance"
                    />
                    <path
                      fill="#D9D9D9"
                      d="M521 905h100v119H521z"
                      className="exit"
                    />
                  </g>
                  <g className="Arrows">
                    <path
                      fill="#000"
                      d="m926 950.5-25-11.934v28.868l25-11.934v-5Zm464 2.5-25-14.434v28.868L1390 953Zm-466.5 2.5h444v-5h-444v5Z"
                      className="Arrow 1"
                    />
                    <path
                      fill="#000"
                      d="m1387.5 865-11.93 25h28.86l-11.93-25h-5Zm2.5-241-14.43 25h28.86L1390 624Zm2.5 243.5v-221h-5v221h5Z"
                      className="Arrow 10"
                    />
                    <path
                      fill="#000"
                      d="m1387.5 499-11.93 25h28.86l-11.93-25h-5Zm2.5-256-14.43 25h28.86L1390 243Zm2.5 258.5v-236h-5v236h5Z"
                      className="Arrow 3"
                    />
                    <path
                      fill="#000"
                      d="m50 532 14.434-25H35.566L50 532Zm2.5-264 11.934-25H35.566L47.5 268h5Zm0 241.5v-244h-5v244h5Z"
                      className="Arrow 6"
                    />
                    <path
                      fill="#000"
                      d="m50 910 14.434-25H35.566L50 910Zm2.5-261 11.934-25H35.566L47.5 649h5Zm0 238.5v-241h-5v241h5Z"
                      className="Arrow 7"
                    />
                    <path
                      fill="#000"
                      d="m521 957-24.877-14.646-.245 28.867L521 957Zm-445.98-6.288-24.897-12.145-.246 28.866 25.1-11.721.043-5Zm423.502 3.597L72.52 950.691l-.042 5 426.002 3.618.042-5Z"
                      className="Arrow 8"
                    />
                    <path
                      fill="#000"
                      d="m801 953-25-14.434v28.868L801 953Zm-149-2.5-25-11.934v28.868l25-11.934v-5Zm126.5 0h-129v5h129v-5Z"
                      className="Arrow 9"
                    />
                    <path
                      fill="#000"
                      d="m851 953-14.434 25h28.868L851 953Zm-2.5 46-11.934 25h28.868L853.5 999h-5Zm0-23.5v26h5v-26h-5Z"
                      className="Arrow 11"
                    />
                    <path
                      fill="#000"
                      d="m571 1024 14.434-25h-28.868L571 1024Zm2.5-46 11.934-25h-28.868l11.934 25h5Zm0 23.5v-26h-5v26h5Z"
                      className="Arrow 12"
                    />
                    <path
                      fill="#000"
                      d="m1315 195.5 25 11.934v-28.868l-25 11.934v5ZM100 193l25 14.434v-28.868L100 193Zm1217.5-2.5h-1195v5h1195v-5Z"
                      className="Arrow 4"
                    />
                    <path
                      fill="#000"
                      d="m1315 576.5 25 11.934v-28.868l-25 11.934v5ZM100 574l25 14.434v-28.868L100 574Zm1217.5-2.5h-1195v5h1195v-5Z"
                      className="Arrow 5"
                    />
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="a" className="a">
                  <path fill="#fff" d="M0 0h1440v1024H0z" />
                </clipPath>
              </defs>
            </svg>
          </Paper>
        </>
      )}
    </ThemeProvider>
  );
}

export default Home;
