import React from "react";
import { useTheme } from "../../../../context/ThemeContext";


type TableHeaderProps = {
  header: string;
};

const TableHeading = ({ header }: TableHeaderProps): React.JSX.Element => {
  const {themeMode} = useTheme()
  return <h2 className={`text-2xl ${themeMode === 'light' ? 'text-dark' : 'text-white'}`}>{header}</h2>;
};

export default TableHeading;
