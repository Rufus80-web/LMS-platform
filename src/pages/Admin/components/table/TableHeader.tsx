import {} from 'react'
import { TableHead, TableRow, TableCell} from '@mui/material'

const TableHeader = () => {
  return (
    <TableHead>
        <TableRow style={{backgroundColor:'#272829'}}>
            <TableCell style={{color:'whitesmoke'}}>#</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Name</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Course Code</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Instructor</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Course Hours</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Created On</TableCell>
        </TableRow>
    </TableHead>
  )
}

export default TableHeader