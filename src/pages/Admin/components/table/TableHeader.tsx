import {} from 'react'
import { TableHead, TableRow, TableCell} from '@mui/material'

const TableHeader = () => {
  return (
    <TableHead>
        <TableRow style={{backgroundColor:'#272829'}}>
            <TableCell style={{color:'whitesmoke'}}>#</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Name</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Email</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Address</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Course</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Date</TableCell>
        </TableRow>
    </TableHead>
  )
}

export default TableHeader