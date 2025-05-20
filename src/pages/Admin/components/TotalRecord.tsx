import {} from "react";

type RecordProps = {
    title: string,
    count: number
}

const TotalRecord = ( { title, count}: RecordProps) => {
  return (
    <div className="w-[50%] rounded-lg h-full flex flex-col text-3xl justify-center items-center gap-1 bg-[#a19f9f3b]">
      <h2>{ title }</h2>
      <h1>{ count }</h1>
    </div>
  );
};

export default TotalRecord;
