import { JSX } from "react";

type TableRowProps<T> = {
  item: T;
};


const TableRow = <T extends {td1: string; td2: string; td3: string, td4: string}>({ item }: TableRowProps<T>): JSX.Element => {
  return (
    <tr className="bg-white">
       <td className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td1}</td>
       <td className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td2}</td>
       <td className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td3}</td>
       <td className="px-4 py-3 text-gray-700 text-[12px] text-left ">{item.td4}</td>
    </tr>
  );
};

export default TableRow;
