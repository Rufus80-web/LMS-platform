type TableHeaderprops = {
  th1: string;
  th2: string;
  th3: string;
  th4?: string;
};

const TableHeader = ({ th1, th2, th3, th4 }: TableHeaderprops) => {
  return (
    <thead>
      <tr className="bg-white">
        <th className="text-left px-4 py-2 text-sm font-bold">{th1}</th>
        <th className="text-left px-4 py-2 text-sm font-bold">{th2}</th>
        <th className="text-left px-4 py-2 text-sm font-bold">{th3}</th>
        <th className="text-left px-4 py-2 text-sm font-bold">{th4}</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
