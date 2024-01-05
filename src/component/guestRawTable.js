import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import NewGuest from "./newGuest";
import Title from "./titleBar";
import { GuestDataContext } from "../context/guestDataContext";
import { combineNames } from "../utils/stringUtil";
import GuestCSVParser from "../data/guestCSVParser";

// function preventDefault(event) {
//   event.preventDefault();
// }

function GuestRawTable() {
  const { guestData } = React.useContext(GuestDataContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const addClickHandler = (e) => {
    setIsDialogOpen(true);
  };

  const closeHandler = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Title>賓客名單</Title>
      <Button onClick={addClickHandler}>新增賓客</Button>
      <GuestCSVParser />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名字</TableCell>
            <TableCell>人數</TableCell>
            <TableCell>關係</TableCell>
            <TableCell>桌次</TableCell>
            <TableCell>紅包</TableCell>
            <TableCell>已報到</TableCell>
            <TableCell>已領餅</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestData &&
            guestData
              .sort((a, b) => b?.LastModifiedTime - a?.LastModifiedTime)
              .map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{combineNames(row.Name)}</TableCell>
                  <TableCell>
                    {row.NoOfRegular + row.NoOfVegetarian + row.NoOfChildren}
                  </TableCell>
                  <TableCell>{row.Side}</TableCell>
                  <TableCell>{row.TableNo.join(", ")}</TableCell>
                  <TableCell>{row.EnvelopId}</TableCell>
                  <TableCell>
                    {row.IsCheckedIn && (
                      <CheckBoxOutlinedIcon></CheckBoxOutlinedIcon>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.IsCakeGiven && (
                      <CheckBoxOutlinedIcon></CheckBoxOutlinedIcon>
                    )}
                  </TableCell>
                  {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <NewGuest open={isDialogOpen} onClose={closeHandler} />
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </>
  );
}

export default GuestRawTable;
