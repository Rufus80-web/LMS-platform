import {} from 'react'
import { TableHead, TableRow, TableCell} from '@mui/material'

const HeaderTable = () => {
  return (
    <TableHead>
        <TableRow style={{backgroundColor:'#272829'}}>
            <TableCell style={{color:'whitesmoke'}}>#</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Name</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Email</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Address</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Created On</TableCell>
        </TableRow>
    </TableHead>
  )
}

export default HeaderTable