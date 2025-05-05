import React from "react";

type TableHeaderProps = {
  header: string;
};

const TableHeading = ({ header }: TableHeaderProps): React.JSX.Element => {
  return <h2 className="text-2xl">{header}</h2>;
};

export default TableHeading;
