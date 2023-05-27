import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
