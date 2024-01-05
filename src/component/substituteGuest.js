import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubstituteDetail from "./substituteDetail";
import { GuestDataContext } from "../context/guestDataContext";
import { findGuestById } from "../utils/guestUtil";
import { combineNames } from "../utils/stringUtil";

/**
 *
 * @param guestData
 * @param substituteFor
 * @param guestSubstittueChangeHandler
 * @returns
 */
function SubstituteGuest({
  guest,
  substituteFor,
  guestSubstituteChangeHandler,
  isGuestCake = false,
  title,
}) {
  const { guestData } = React.useContext(GuestDataContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedSubstitute, setSelectedSubstitute] = React.useState(null);

  const onEditClick = (status, id, idx) => {
    setSelectedSubstitute(id);
    setIsDialogOpen(true);
  };

  const onDeleteClick = (id, idx) => {
    const newSubstittueFor = [...substituteFor]; // this is a simple array of id, shallow clone is fine
    newSubstittueFor.splice(idx, 1);
    guestSubstituteChangeHandler(newSubstittueFor);
  };

  const substituteOnChange = (id) => {
    // when add, will return a new id
    if (id !== selectedSubstitute) setSelectedSubstitute(id);

    const newSubstittueFor = [...substituteFor]; // this is a simple array of id, shallow clone is fine
    if (!newSubstittueFor.includes(id)) {
      newSubstittueFor.push(id);
      guestSubstituteChangeHandler(newSubstittueFor);
    }
  };

  const onClose = () => {
    setIsDialogOpen(false);
  };

  const Substitute = (id) => {
    const currentSub = findGuestById(guestData, id);
    return (
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography>{combineNames(currentSub.Name)}</Typography>
        <Typography>{currentSub.CheckinNote}</Typography>
        <Typography>{currentSub.CakeNote}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Accordion
        expanded={!!substituteFor}
        sx={{
          "&.MuiAccordion-root ": { bgcolor: "#EEEEEE", mt: "8px" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="accordion-substitute"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {substituteFor &&
            substituteFor.map((id, idx) => {
              return (
                <Paper
                  sx={{
                    p: 2,
                    pb: 1,
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                  }}
                  key={"substitute-guest-" + idx}
                >
                  <Typography>{idx + 1 + ". "}</Typography>
                  {Substitute(id)}
                  <Button
                    id={"button-substitute-edit-" + idx}
                    onClick={() => onEditClick("modify", id, idx)}
                  >
                    修改
                  </Button>
                  <Button
                    id={"button-substitute-edit-" + idx}
                    onClick={() => onDeleteClick(id, idx)}
                  >
                    刪除
                  </Button>
                </Paper>
              );
            })}
          <Button
            id={"button-substitute-add"}
            onClick={() => onEditClick("new", "")}
          >
            新增
          </Button>
          <SubstituteDetail
            open={isDialogOpen}
            selectedSubstitute={selectedSubstitute}
            onChange={substituteOnChange}
            onClose={onClose}
            guest={guest}
            isGuestCake={isGuestCake}
          ></SubstituteDetail>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SubstituteGuest;
