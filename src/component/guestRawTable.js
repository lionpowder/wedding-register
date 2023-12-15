import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./titleBar";
import { getFullGuestList, addGuestData } from "../db/api";

// function preventDefault(event) {
//   event.preventDefault();
// }

function GuestRawTable() {
  // TODO: display different data based on the selection
  const [guestData, setGuestData] = React.useState([]);
  React.useEffect(() => {
    // load guest data
    getFullGuestList().then((data) => {
      setGuestData(data);
    });

    // const output = fetchPost();
    // console.log(output);
  }, []);

  return (
    <>
      <Title>Recent Orders</Title>
      <Button onClick={addGuestData}>Add Guest Data</Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number of People</TableCell>
            <TableCell>Relationship</TableCell>
            <TableCell>Table</TableCell>
            <TableCell align="right">Side</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestData &&
            guestData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row["Name"]}</TableCell>
                <TableCell>{row["Number of People"]}</TableCell>
                <TableCell>{row["Relationship"]}</TableCell>
                <TableCell>{row["Table"]}</TableCell>
                <TableCell>{row["Side"]}</TableCell>
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
