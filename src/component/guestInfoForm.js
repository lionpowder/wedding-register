import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { sides } from "../data/sideData";
import { relationships } from "../data/relationshipData";
import { defaultTables } from "../data/defaultTables";
import GuestNumber from "./guestNumber";
import { defaultGuestData } from "../data/guestData";
import { addGuestData, dateToTimestamp, updateGuestData } from "../db/cloudDb";
import { Checkbox, FormControlLabel } from "@mui/material";
import { side } from "../utils/consts";

/**
 * Provide guestInfo when modifying existing guest data
 * @returns
 */
function GuestInfoForm({ open, onChange, onClose, guestInfo }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [currentGuest, setCurrentGuest] = React.useState(defaultGuestData);

  React.useEffect(() => {
    if (guestInfo) {
      setCurrentGuest(guestInfo);
    }
  }, [guestInfo]);

  const onFormClose = () => {
    setCurrentGuest(defaultGuestData);
    onClose && onClose();
  };

  const onSave = (e) => {
    const finalSavedData = {
      ...currentGuest,
      LastModifiedTime: dateToTimestamp(new Date()),
    };

    if (guestInfo) {
      updateGuestData(finalSavedData);
    } else {
      addGuestData(finalSavedData);
    }

    onChange && onChange(finalSavedData);
    onFormClose();
  };

  const onNameChange = (e) => {
    const modifiedGuest = { ...currentGuest, Name: [e.target.value] };
    setCurrentGuest(modifiedGuest);
  };

  const onAliasChange = (e) => {
    const modifiedGuest = { ...currentGuest, Alias: [e.target.value] };
    setCurrentGuest(modifiedGuest);
  };

  const onSideChange = (e, value) => {
    let isNeedCake = false;
    if (value !== side.groom) {
      isNeedCake = true;
    }
    const modifiedGuest = {
      ...currentGuest,
      Side: value,
      NeedCake: isNeedCake,
    };
    setCurrentGuest(modifiedGuest);
  };

  const onRelationshipChange = (e, value) => {
    const modifiedGuest = { ...currentGuest, Relationship: value };
    setCurrentGuest(modifiedGuest);
  };

  const onNeedCakeChange = (e) => {
    const isNeedCake = e.target.checked;
    const modifiedGuest = { ...currentGuest, NeedCake: isNeedCake };
    setCurrentGuest(modifiedGuest);
  };

  const onTableChange = (e, value) => {
    const modifiedGuest = {
      ...currentGuest,
      TableNo: value?.map((data) => {
        return data.tableCode;
      }),
    };
    setCurrentGuest(modifiedGuest);
  };

  const onGeneralNoteChange = (e) => {
    const modifiedGuest = { ...currentGuest, GeneralNote: [e.target.value] };
    setCurrentGuest(modifiedGuest);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{guestInfo ? "更改賓客資訊" : "新增賓客"}</DialogTitle>
      <DialogContent
        sx={{
          gap: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id={"textfield-new-guest-name"}
          label="名字"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mt: "8px",
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={currentGuest.Name[0]}
          onChange={onNameChange}
          helperText={"可輸入該組人報到時可能使用的所有人名以利當天搜尋"}
          placeholder={"王小明 孫悟空"}
        />
        <TextField
          id={"textfield-new-guest-name"}
          label="別名"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mt: "8px",
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={currentGuest.Alias[0]}
          onChange={onAliasChange}
          helperText={"可輸入英文名或關係等以利當天搜尋"}
          placeholder={"Jessica 三姨婆"}
        />
        <GuestNumber
          id={"new-guest-number"}
          selectedGuest={currentGuest}
          setSelectedGuest={setCurrentGuest}
          isReadOnly={false}
        />
        <Autocomplete
          id="multi-select-new-guest-side"
          options={sides}
          // getOptionLabel={(option) => option.title}
          value={currentGuest.Side}
          onChange={onSideChange}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="賓客種類" />}
        />
        <FormControlLabel
          label="須發餅"
          control={
            <Checkbox
              id={"checkbox-need-cake"}
              checked={currentGuest.NeedCake}
              onChange={onNeedCakeChange}
            />
          }
        />
        <Autocomplete
          multiple
          limitTags={3}
          id="multi-select-new-guest-relationship"
          options={relationships}
          // getOptionLabel={(option) => option.title}
          value={currentGuest.Relationship}
          onChange={onRelationshipChange}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="關係" />}
        />
        <Autocomplete
          multiple
          limitTags={6}
          id="multi-select-new-guest-table"
          options={defaultTables}
          getOptionLabel={(option) => option.tableCode}
          getOptionKey={(option) => option.tableCode}
          value={currentGuest.TableNo.map((data) => {
            return defaultTables.find((table) => table.tableCode === data);
          })}
          onChange={onTableChange}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="桌次" />}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.tableCode + " " + option.tableName}
              </Box>
            );
          }}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              return value === option.tableCode || value === null;
            } else {
              return (
                value === null ||
                value === undefined ||
                value.tableCode === option.tableCode
              );
            }
          }}
        />
        <TextField
          id={"multiline-general-note"}
          label="備註"
          multiline
          rows={3}
          value={currentGuest.GeneralNote || ""}
          onChange={onGeneralNoteChange}
          placeholder={"不收禮金"}
          helperText={"展示給報到工作人員"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onFormClose}>取消</Button>
        <Button variant="contained" onClick={onSave}>
          {guestInfo ? "更改" : "新增"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestInfoForm;
