/***
 * Util for generate components of menu list on the left
 */

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { pages } from "./pageUtil";
import { useLocation, useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {pages.map((page) => {
        return (
          <ListItemButton
            key={page.title}
            onClick={(event) => {
              event.preventDefault();
              if (location.pathname !== page.path) {
                navigate(page.path);
              }
            }}
            selected={location.pathname === page.path}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItemButton>
        );
      })}
    </>
  );
};

// TODO: Backend management
export const backendListItems = (
  <>
    <ListSubheader component="div" inset>
      Backend Management
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Guest Import" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Guest Output" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Statistic" />
    </ListItemButton>
  </>
);
