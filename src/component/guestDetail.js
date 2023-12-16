import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { GuestDataContext } from "../context/guestDataContext";
import { addGuestData } from "../db/cloudDb";
import { combineNames } from "../utils/stringUtil";
import { defaultGuestData } from "../data/guestData";
import Title from "./titleBar";

function GuestDetail(props) {
  const selectedGuest = props.guest || defaultGuestData;

  return (
    <>
      <Title isSub={true}>{combineNames(selectedGuest.Name)}</Title>
    </>
  );
}

export default GuestDetail;
