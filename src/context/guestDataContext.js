import React from "react";

export const GuestDataContext = React.createContect({
  // eslint-disable-next-line no-undef
  guestData,
});

export const GuestDataProvider = ({ children }) => {
  const [guestData, setGuestData] = React.useState(null);

  const value = {
    guestData,
    setGuestData,
  };

  return (
    <GuestDataContext.Provider value={value}>
      {children}
    </GuestDataContext.Provider>
  );
};
