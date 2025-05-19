import { ReactNode, JSX } from "react"
import { TableBody as TBody } from '@mui/material'

type TableBodyProps<T> = {
    data: T[],
    render: (item: T, index: number) => ReactNode
}

const TableBody = <T,>( {data, render}: TableBodyProps<T> ): JSX.Element => {
  return (
    <TBody className="divide-y divide-gray-600">
       {data?.map((row, index) => render(row, index))}
    </TBody>
  )
}

export default TableBody