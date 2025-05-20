import {} from 'react'
import { TableRow, TableCell, TableBody as BodyTable} from '@mui/material'
import { CustomTableBodyProps } from '../../../../static/types'
import { Link } from 'react-router-dom'

type DataArray = {
    data: CustomTableBodyProps[],
    url: string
}

const TableBody = ( { data, url }: DataArray) => {
  return (
    <BodyTable>
      { 
        data && data.map((item: CustomTableBodyProps) => (
            <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{textDecoration:'underline'}}><Link to={{pathname: url}} className='text-sky-600 cursor-pointer'>{item.name}</Link></TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.course[0]}</TableCell>
                <TableCell>{item.date}</TableCell>
            </TableRow>
        ))
      }
    </BodyTable>
  )
}

export default TableBody