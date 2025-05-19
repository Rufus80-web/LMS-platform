import { TableHead, TableCell, TableRow } from '@mui/material'
import { useTheme } from '../../../../context/ThemeContext';

type TableHeaderprops = {
  th1: string;
  th2: string;
  th3: string;
  th4?: string;
};

const TableHeader = ({ th1, th2, th3, th4 }: TableHeaderprops) => {
  const {themeMode} = useTheme()
  return (
    <TableHead>
      <TableRow className={` ${themeMode === 'light' ? 'bg-white' : 'bg-slate-100'}`}>
        <TableCell className="text-left px-4 py-2 text-2xl font-bold">{th1}</TableCell>
        <TableCell className="text-left px-4 py-2 text-sm font-bold">{th2}</TableCell>
        <TableCell className="text-left px-4 py-2 text-sm font-bold">{th3}</TableCell>
        <TableCell className="text-left px-4 py-2 text-sm font-bold">{th4}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
