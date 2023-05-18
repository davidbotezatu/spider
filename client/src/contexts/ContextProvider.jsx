import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const stareInitiala = {
  notificari: false,
  profilUtilizator: false,
};

export const ContextProvider = ({ children }) => {
  const [activareSidebar, setActivareSidebar] = useState(true);
  const [clicked, setClicked] = useState(stareInitiala);

  const handleClick = (e) => {
    setClicked({ ...stareInitiala, [e]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activareSidebar,
        setActivareSidebar,
        clicked,
        setClicked,
        handleClick,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
