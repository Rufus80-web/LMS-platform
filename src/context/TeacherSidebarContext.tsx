import { createContext, useContext } from "react";

export const TeacherSidebarContext = createContext({
  isOpen: true,
  shouldOpen: () => {},
});


export const useTeacherSidebarContext = () => useContext(TeacherSidebarContext);