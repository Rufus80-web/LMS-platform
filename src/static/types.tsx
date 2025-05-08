import { ChangeEvent } from "react";

type TableSorting = (property: string) => void;

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

export type TableContextProps = {
  _order: 'desc' | 'asc',
  _orderBy: string,
  _sortedRow: Array<TableDataProps>,
  _page: number,
  _rowPerPage: number,
  sort: TableSorting
  changePage: (event: any, newPage: number) => void,
  changeRowPerPage: (event: ChangeEvent | any) => void
}