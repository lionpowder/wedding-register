import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { GuestDataContext } from "../context/guestDataContext";
import { addGuestData } from "../db/cloudDb";
import { combineNames } from "../utils/stringUtil";
import Title from "./titleBar";
import { defaultGuestData } from "../data/guestData";

// function preventDefault(event) {
//   event.preventDefault();
// }

function GuestRawTable() {
  const { guestData } = React.useContext(GuestDataContext);

  const addClickHandler = (e) => {
    // TODO: use generateNewGuestData to generate new data
    addGuestData(defaultGuestData);
  };

  return (
    <>
      <Title>賓客名單</Title>
      <Button onClick={addClickHandler}>新增賓客</Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名字</TableCell>
            <TableCell>人數</TableCell>
            <TableCell>關係</TableCell>
            <TableCell>桌次</TableCell>
            <TableCell>紅包</TableCell>
            <TableCell>已報到</TableCell>
            <TableCell align="right">已領餅</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestData &&
            guestData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{combineNames(row.Name)}</TableCell>
                <TableCell>
                  {row.NoOfRegular + row.NoOfVegetarian + row.NoOfChildren}
                </TableCell>
                <TableCell>{row.Side}</TableCell>
                <TableCell>{row.TableNo}</TableCell>
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
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </>
  );
}

export default GuestRawTable;
