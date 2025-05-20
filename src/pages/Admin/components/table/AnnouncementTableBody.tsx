import {} from 'react'
import { TableRow, TableCell, TableBody as BodyTable} from '@mui/material'
import { AnnouncementHeaderProps } from '../../../../static/types'
import { Link } from 'react-router-dom'

type AnnouncementTable = {
    data: AnnouncementHeaderProps[],
    url: string
}

const AnnouncementTableBody = ( { data, url }: AnnouncementTable) => {
  return (
    <BodyTable>
      { 
        data && data.map((item: AnnouncementHeaderProps) => (
            <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{textDecoration:'underline'}}><Link to={{pathname: url}} className='text-sky-600 cursor-pointer'>{item.title}</Link></TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.createdBy}</TableCell>
                <TableCell>{item.date}</TableCell>
            </TableRow>
        ))
      }
    </BodyTable>
  )
}

export default AnnouncementTableBody