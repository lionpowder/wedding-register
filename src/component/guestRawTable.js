import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import GuestInfoForm from "./guestInfoForm";
import Title from "./titleBar";
import { GuestDataContext } from "../context/guestDataContext";
import { combineNames } from "../utils/stringUtil";
import { Delete, Edit } from "@mui/icons-material";
import { deleteGuestData } from "../db/cloudDb";
import { IconButton } from "@mui/material";
import ConfirmDialog from "./confirmDialog";

// function preventDefault(event) {
//   event.preventDefault();
// }

function GuestRawTable({ showAllGuests }) {
  const { guestData, fullGuestData } = React.useContext(GuestDataContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [guestBeingEdited, setGuestBeingEdited] = React.useState(null);

  const displayedGuestData = showAllGuests ? fullGuestData : guestData;

  const editGuestData = (guestInfo) => {
    setGuestBeingEdited(guestInfo);
    setIsDialogOpen(true);
  };

  const addClickHandler = (e) => {
    setIsDialogOpen(true);
  };

  const closeHandler = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Title>賓客名單</Title>
      <div style={{ textAlign: "right" }}>
        <Button variant="contained" onClick={addClickHandler}>
          新增賓客
        </Button>
      </div>
      <br />

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
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedGuestData &&
            displayedGuestData
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
                  <TableCell>
                    {
                      <>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => {
                            editGuestData(row);
                          }}
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                        <ConfirmDialog
                          title={"刪除確認"}
                          content={`確認刪除${row?.Name?.join(" ")}的資料?`}
                          onConfirm={() => deleteGuestData(row)}
                          component={
                            <IconButton aria-label="delete" size="small">
                              <Delete fontSize="inherit" />
                            </IconButton>
                          }
                        />
                      </>
                    }
                  </TableCell>
                  {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <GuestInfoForm
        open={isDialogOpen}
        onClose={closeHandler}
        guestInfo={guestBeingEdited}
      />
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </>
  );
}

export default GuestRawTable;
