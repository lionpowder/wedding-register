import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { pages } from "./pageUtil";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const mainListItems = (onClickHandler) => {
  return (
    <>
      {Object.keys(pages).map((page) => {
        return (
          <ListItemButton
            key={page}
            onClick={(event) => {
              onClickHandler(event, page);
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={page} />
          </ListItemButton>
        );
      })}
    </>
  );
};
// export const mainListItems = React.useMemo((onClickHandler) => {
//   console.log(onClickHandler);
//   return (
//     <React.Fragment>
//       <ListItemButton onClick={onClickHandler("Main")}>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Main" />
//       </ListItemButton>
//       <ListItemButton onClick={onClickHandler("Checkin")}>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Guest List" />
//       </ListItemButton>
//       <ListItemButton onClick={onClickHandler("Table")}>
//         <ListItemIcon>
//           <ShoppingCartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Guest Table" />
//       </ListItemButton>
//       <ListItemButton onClick={onClickHandler("Cake")}>
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="Bride Cake" />
//       </ListItemButton>
//     </React.Fragment>
//   );
// }, []);

export const backendListItems = (
  <React.Fragment>
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
  </React.Fragment>
);
