import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TopicLabel from "./TopicLabel/TopicLabel";
import Point from "./Point/Point";
import Priority from "./Priority/Priority";
import Assignee from "./Assignee/Assignee";

type Props = {
  title: string;
  topic: string;
  point: number;
  priority: number;
  userId: string;
};

const TaskCard = (props: Props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <span>{props.title}</span>
        <TopicLabel value="abc" color="yellow" />
        <Point value={3} />
        <Priority level={3} />
        <Assignee />
      </Card>
    </Box>
  );
};

export default TaskCard;
