import { ReactNode, JSX } from "react"

type TableBodyProps<T> = {
    data: T[],
    render: (item: T, index: number) => ReactNode
}

const TableBody = <T,>( {data, render}: TableBodyProps<T> ): JSX.Element => {
  return (
    <tbody className="divide-y divide-gray-600">
       {data?.map((row, index) => render(row, index))}
    </tbody>
  )
}

export default TableBody