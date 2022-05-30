import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useGetAllParkingSpotQuery } from "../services/parkingSpotService";
import Loader from "../components/Loader";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router-dom";

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

  const status = (code) => {
    const isAvailable = parkingSpots.find((spot) => spot.spotCode === code);
    return isAvailable.status ? "green" : "red";
  };

  return (
    <>
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
            <NavigationIcon sx={{ mr: 1 }} />
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
              <g className="Desktop - 1" clipPath="url(#a)">
                <path fill="#fff" d="M0 0h1440v1024H0z" />
                <g className="Spots">
                  <path
                    fill={status("sp74")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1369.83 17.5h65.667v125h-65.667z"
                    className="sp74"
                  />
                  <path
                    fill={status("sp73")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1299.17 17.5h65.667v125h-65.667z"
                    className="sp73"
                  />
                  <path
                    fill={status("sp72")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1228.5 17.5h65.667v125H1228.5z"
                    className="sp72"
                  />
                  <path
                    fill={status("sp71")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1129.83 17.5h65.667v125h-65.667z"
                    className="sp71"
                  />
                  <path
                    fill={status("sp70")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1059.17 17.5h65.667v125h-65.667z"
                    className="sp70"
                  />
                  <path
                    fill={status("sp69")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M988.5 17.5h65.667v125H988.5z"
                    className="sp69"
                  />
                  <path
                    fill={status("sp68")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M888.833 17.5H954.5v125h-65.667z"
                    className="sp68"
                  />
                  <path
                    fill={status("sp67")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M818.167 17.5h65.667v125h-65.667z"
                    className="sp67"
                  />
                  <path
                    fill={status("sp66")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M747.5 17.5h65.667v125H747.5z"
                    className="sp66"
                  />
                  <path
                    fill={status("sp65")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M629.833 17.5H695.5v125h-65.667z"
                    className="sp65"
                  />
                  <path
                    fill={status("sp64")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M559.167 17.5h65.667v125h-65.667z"
                    className="sp64"
                  />
                  <path
                    fill={status("sp63")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M488.5 17.5h65.667v125H488.5z"
                    className="sp63"
                  />
                  <path
                    fill={status("sp62")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M386.833 15.5H452.5v125h-65.667z"
                    className="sp62"
                  />
                  <path
                    fill={status("sp61")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M316.167 15.5h65.667v125h-65.667z"
                    className="sp61"
                  />
                  <path
                    fill={status("sp60")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M245.5 15.5h65.667v125H245.5z"
                    className="sp60"
                  />
                  <path
                    fill={status("sp59")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M143.833 17.5H209.5v125h-65.667z"
                    className="sp59"
                  />
                  <path
                    fill={status("sp58")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M73.167 17.5h65.667v125H73.167z"
                    className="sp58"
                  />
                  <path
                    fill={status("sp57")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M2.5 17.5h65.667v125H2.5z"
                    className="sp57"
                  />
                  <path
                    fill={status("sp56")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M102.5 245.5h65.667v125H102.5z"
                    className="sp56"
                  />
                  <path
                    fill={status("sp55")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M219.5 245.5h65.667v125H219.5z"
                    className="sp55"
                  />
                  <path
                    fill={status("sp54")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M290.167 245.5h65.667v125h-65.667z"
                    className="sp54"
                  />
                  <path
                    fill={status("sp53")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M360.833 245.5H426.5v125h-65.667z"
                    className="sp53"
                  />
                  <path
                    fill={status("sp52")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M488.5 245.5h65.667v125H488.5z"
                    className="sp52"
                  />
                  <path
                    fill={status("sp51")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M559.167 245.5h65.667v125h-65.667z"
                    className="sp51"
                  />
                  <path
                    fill={status("sp50")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M629.833 245.5H695.5v125h-65.667z"
                    className="sp50"
                  />
                  <path
                    fill={status("sp49")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M747.5 245.5h65.667v125H747.5z"
                    className="sp49"
                  />
                  <path
                    fill={status("sp48")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M818.167 245.5h65.667v125h-65.667z"
                    className="sp48"
                  />
                  <path
                    fill={status("sp47")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M888.833 245.5H954.5v125h-65.667z"
                    className="sp47"
                  />
                  <path
                    fill={status("sp46")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1016.5 245.5h65.667v125H1016.5z"
                    className="sp46"
                  />
                  <path
                    fill={status("sp45")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1087.17 245.5h65.667v125h-65.667z"
                    className="sp45"
                  />
                  <path
                    fill={status("sp44")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1157.83 245.5h65.667v125h-65.667z"
                    className="sp44"
                  />
                  <path
                    fill={status("sp43")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1271.5 245.5h65.667v125H1271.5z"
                    className="sp43"
                  />
                  <path
                    fill={status("sp42")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1271.5 396.5h65.667v125H1271.5z"
                    className="sp42"
                  />
                  <path
                    fill={status("sp41")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1157.83 396.5h65.667v125h-65.667z"
                    className="sp41"
                  />
                  <path
                    fill={status("sp40")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1087.17 396.5h65.667v125h-65.667z"
                    className="sp40"
                  />
                  <path
                    fill={status("sp39")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1016.5 396.5h65.667v125H1016.5z"
                    className="sp39"
                  />
                  <path
                    fill={status("sp38")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M888.833 396.5H954.5v125h-65.667z"
                    className="sp38"
                  />
                  <path
                    fill={status("sp37")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M818.167 396.5h65.667v125h-65.667z"
                    className="sp37"
                  />
                  <path
                    fill={status("sp36")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M747.5 396.5h65.667v125H747.5z"
                    className="sp36"
                  />
                  <path
                    fill={status("sp35")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M629.833 396.5H695.5v125h-65.667z"
                    className="sp35"
                  />
                  <path
                    fill={status("sp34")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M559.167 396.5h65.667v125h-65.667z"
                    className="sp34"
                  />
                  <path
                    fill={status("sp33")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M488.5 396.5h65.667v125H488.5z"
                    className="sp33"
                  />
                  <path
                    fill={status("sp32")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M360.833 396.5H426.5v125h-65.667z"
                    className="sp32"
                  />
                  <path
                    fill={status("sp31")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M290.167 396.5h65.667v125h-65.667z"
                    className="sp31"
                  />
                  <path
                    fill={status("sp30")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M219.5 396.5h65.667v125H219.5z"
                    className="sp30"
                  />
                  <path
                    fill={status("sp29")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M102.5 396.5h65.667v125H102.5z"
                    className="sp29"
                  />
                  <path
                    fill={status("sp28")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M102.5 624.5h65.667v125H102.5z"
                    className="sp28"
                  />
                  <path
                    fill={status("sp27")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M219.5 624.5h65.667v125H219.5z"
                    className="sp27"
                  />
                  <path
                    fill={status("sp26")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M290.167 624.5h65.667v125h-65.667z"
                    className="sp26"
                  />
                  <path
                    fill={status("sp25")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M360.833 624.5H426.5v125h-65.667z"
                    className="sp25"
                  />
                  <path
                    fill={status("sp24")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M559.167 624.5h65.667v125h-65.667z"
                    className="sp24"
                  />
                  <path
                    fill={status("sp23")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M488.5 624.5h65.667v125H488.5z"
                    className="sp23"
                  />
                  <path
                    fill={status("sp22")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M629.833 624.5H695.5v125h-65.667z"
                    className="sp22"
                  />
                  <path
                    fill={status("sp21")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M747.5 624.5h65.667v125H747.5z"
                    className="sp21"
                  />
                  <path
                    fill={status("sp20")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M818.167 624.5h65.667v125h-65.667z"
                    className="sp20"
                  />
                  <path
                    fill={status("sp19")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M888.833 624.5H954.5v125h-65.667z"
                    className="sp19"
                  />
                  <path
                    fill={status("sp18")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1016.5 624.5h65.667v125H1016.5z"
                    className="sp18"
                  />
                  <path
                    fill={status("sp17")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1087.17 624.5h65.667v125h-65.667z"
                    className="sp17"
                  />
                  <path
                    fill={status("sp16")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1157.83 624.5h65.667v125h-65.667z"
                    className="sp16"
                  />
                  <path
                    fill={status("sp15")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1271.5 624.5h65.667v125H1271.5z"
                    className="sp15"
                  />
                  <path
                    fill={status("sp14")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1271.5 775.5h65.667v125H1271.5z"
                    className="sp14"
                  />
                  <path
                    fill={status("sp13")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1157.83 775.5h65.667v125h-65.667z"
                    className="sp13"
                  />
                  <path
                    fill={status("sp12")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1087.17 775.5h65.667v125h-65.667z"
                    className="sp12"
                  />
                  <path
                    fill={status("sp11")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M1016.5 775.5h65.667v125H1016.5z"
                    className="sp11"
                  />
                  <path
                    fill={status("sp10")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M888.833 775.5H954.5v125h-65.667z"
                    className="sp10"
                  />
                  <path
                    fill={status("sp9")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M818.167 775.5h65.667v125h-65.667z"
                    className="sp9"
                  />
                  <path
                    fill={status("sp8")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M747.5 775.5h65.667v125H747.5z"
                    className="sp8"
                  />
                  <path
                    fill={status("sp7")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M629.833 775.5H695.5v125h-65.667z"
                    className="sp7"
                  />
                  <path
                    fill={status("sp6")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M559.167 775.5h65.667v125h-65.667z"
                    className="sp6"
                  />
                  <path
                    fill={status("sp5")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M488.5 775.5h65.667v125H488.5z"
                    className="sp5"
                  />
                  <path
                    fill={status("sp4")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M360.833 775.5H426.5v125h-65.667z"
                    className="sp4"
                  />
                  <path
                    fill={status("sp3")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M290.167 775.5h65.667v125h-65.667z"
                    className="sp3"
                  />
                  <path
                    fill={status("sp2")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M219.5 775.5h65.667v125H219.5z"
                    className="sp2"
                  />
                  <path
                    fill={status("sp1")}
                    stroke="#000"
                    strokeWidth="5"
                    d="M102.5 775.5h65.667v125H102.5z"
                    className="sp1"
                  />
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
    </>
  );
}

export default Home;
