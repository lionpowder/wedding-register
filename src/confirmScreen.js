import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useReadLocalStorage } from "usehooks-ts";

export const CONFIRM_GUEST_STORE = "confirm-guest-store";

function ConfirmScreen() {
  const confirmGuestStore = useReadLocalStorage(CONFIRM_GUEST_STORE);
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      {confirmGuestStore.Name && (
        <div>
          <span>{confirmGuestStore.Name.join(", ")}</span>
        </div>
      )}
    </Container>
  );
}

export default ConfirmScreen;
