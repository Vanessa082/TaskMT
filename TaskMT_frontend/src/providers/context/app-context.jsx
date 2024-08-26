import { createContext, useContext, useEffect, useState } from "react";
import { useQueryRequest } from "../hooks/use-query-request";

const AppContext = createContext(null);

function AppContextProvider({ children }) {
  const {
    data: currentUser,
    setData: setCurrentUser,
    refetch: refetchCurrentUser,
    error: currentUserError,
    loading: currentUserLoading,
  } = useQueryRequest("/auth/current-user");

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        refetchCurrentUser,
        currentUserError,
        currentUserLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContextProvider };
