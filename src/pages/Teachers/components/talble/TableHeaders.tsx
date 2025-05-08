import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";

type TableHeadProps = {
    orderBy: string,
    order: 'asc' | 'desc',
    handleSort: (property: string) => void
}

const _TableHeaders = ({orderBy, order, handleSort}: TableHeadProps) => {
  return (
    <TableHead>
      <TableRow className="bg-indigo-300">
        <TableCell>
          <input type="checkbox" className="w-4 h-4 rounded-3xl" />
        </TableCell>
        <TableCell>ID</TableCell>
        <TableCell>
            <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={() => handleSort('name')}>Name</TableSortLabel>
        </TableCell>
        <TableCell>
            <TableSortLabel active={orderBy === 'age'} direction={orderBy === 'age' ? order : 'asc'} onClick={() => handleSort('age')}>Age</TableSortLabel>
        </TableCell>
        <TableCell>
            <TableSortLabel active={orderBy === 'phoneNumber'} direction={orderBy === 'phoneNumber' ? order : 'asc'} onClick={() => handleSort('phoneNumber')}>Phone Number</TableSortLabel>
        </TableCell>
        <TableCell>
            <TableSortLabel active={orderBy === 'email'} direction={orderBy === 'email' ? order : 'asc'} onClick={() => handleSort('email')}>Email</TableSortLabel>
        </TableCell>
        <TableCell>Acess Level</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default _TableHeaders;
