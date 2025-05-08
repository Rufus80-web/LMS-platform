
export type TableDataProps = {
  // index: number
  id: number;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  accessLevel?: HTMLButtonElement;
};

export type TableBodyProps = {
  tableRows: Array<TableDataProps>;
  page: number;
  rowPerPage: number;
};
