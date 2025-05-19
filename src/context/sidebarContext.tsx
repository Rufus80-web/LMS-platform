import { createContext, useContext } from "react";

export const SidebarContext = createContext({
  isOpen: true,
  shouldOpen: () => {},
});


export const useTeacherSidebarContext = () => useContext(SidebarContext);