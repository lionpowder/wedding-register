import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GuestSelect from "./guestSelect";
import SubstituteDetail from "./substituteDetail";

/**
 *
 * @param guestData
 * @param substituteFor
 * @param guestSubstittueChangeHandler
 * @returns
 */
function SubstituteGuest({
  guestData,
  substituteFor,
  guestSubstituteChangeHandler,
  isGuestCake,
  title,
}) {
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

  return (
    <>
      <Accordion
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
                  <GuestSelect
                    sx={{
                      "&.MuiAutocomplete-root": {
                        flexGrow: 1,
                      },
                      "& label.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.6)",
                      },
                      "& input.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.8)",
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                    id={"substitute-guest-" + idx}
                    guestData={guestData}
                    selectedGuest={id}
                    disabled={true}
                  />
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
            onClick={() => onEditClick("new")}
          >
            新增
          </Button>
          <SubstituteDetail
            open={isDialogOpen}
            selectedSubstitute={selectedSubstitute}
            onChange={substituteOnChange}
            onClose={onClose}
            guestData={guestData}
            isGuestCake={isGuestCake}
          ></SubstituteDetail>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SubstituteGuest;
