import React from "react";
import Box from "@mui/material/Box";
type Props = {
  value: string;
  color: string;
};
const Priority = (props: Props) => {
  return (
    <Box
      sx={{ backgroundColor: props.color }}
      className="p-3 min-h-fit w-100 block"
    >
      <span className="text-sm font-normal text-black">{props.value}</span>
    </Box>
  );
};

export default Priority;
