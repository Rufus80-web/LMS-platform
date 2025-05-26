import {} from "react";
import { Button } from "@mui/material";

type MaterialCardProps = {
  name: string;
  state?: boolean;
  func1: () => void;
  func2: () => void;
};

const CustomCard = ({ name, state, func1, func2 }: MaterialCardProps) => {
  return (
    <div
      className={`w-80 h-48 py-2 px-3 bg-white border-2 border-slate-100 rounded-lg absolute top-[-12rem] flex flex-col gap-0.5 duration-300 ease-in-out ${
        state && "top-[0rem] translate-y-50 translate-x-100"
      }`}
    >
      <div className="text-2xl">
        <h2>Warning !!!</h2>
      </div>
      <div className="text-sm mt-1">
        <h3>
          Are you sure you want to delete <mark>{name}</mark>? This process is
          irreversible. If you decide to cancel this action click right button
          below
        </h3>
      </div>
      <div className="flex gap-2 mt-2">
        <Button size="small" variant="contained" onClick={func1}>
          Delete
        </Button>
        <Button
          size="small"
          style={{ backgroundColor: "red", color: "#fff" }}
          onClick={func2}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CustomCard;
