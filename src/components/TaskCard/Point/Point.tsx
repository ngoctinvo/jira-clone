import React from "react";
type Props = {
  value: number;
};
const Priority = (props: Props) => {
  return (
    <div className="py-3 px-5 rounded-lg bg-slate-300 inline-block">
      <span className="text-base font-semibold text-black">{props.value}</span>
    </div>
  );
};

export default Priority;
