import {} from "react";

type TabHeaderProps = {
    name: string,
}

const TableHeader = ( {name}: TabHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-2">
      <div>
        <span className="text-white text-[8px]">|</span>
        <span className="text-[12px]">{name}</span>
      </div>
      <div className="w-7 h-7 hover:rounded-full">
        <span className="fas fa-share text-[8px]"></span>
      </div>
    </div>
  );
};

export default TableHeader;
