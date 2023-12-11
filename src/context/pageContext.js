import React from "react";

export const PageContext = React.createContect({
  // eslint-disable-next-line no-undef
  currentPage,
});

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState(null);

  const value = {
    currentPage,
    setCurrentPage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
