import {} from 'react'
import { TableHead, TableRow, TableCell} from '@mui/material'

const AnnouncementHeader = () => {
  return (
    <TableHead>
        <TableRow style={{backgroundColor:'#272829'}}>
            <TableCell style={{color:'whitesmoke'}}>#</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Title</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Description</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Created By</TableCell>
            <TableCell style={{color:'whitesmoke'}}>Date</TableCell>
        </TableRow>
    </TableHead>
  )
}

export default AnnouncementHeader