import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  //Sidebar si user profile
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Paginare
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toggleUserProfile = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <StateContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        isDropdownOpen,
        toggleUserProfile,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
