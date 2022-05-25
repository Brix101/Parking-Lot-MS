import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function SideButton({ to, icon, text }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ListItemButton
      selected={location.state === text}
      onClick={() => {
        navigate(to, { state: text });
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default SideButton;
