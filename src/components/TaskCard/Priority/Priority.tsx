import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
type Props = {
  level: number;
};
const Priority = (props: Props) => {
  let icon = null;
  switch (props.level) {
    case 3: {
      icon = <KeyboardDoubleArrowUpIcon color="error" />;
    }
    case 2: {
      icon = <KeyboardArrowUpIcon color="warning" />;
    }
    case 1: {
      icon = <DensityMediumIcon color="success" />;
    }
    default: {
      icon = <DensityMediumIcon color="success" />;
    }
  }
  return <div className="p-5 bg-white inline-block">{icon}</div>;
};

export default Priority;
