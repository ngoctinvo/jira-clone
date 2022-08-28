import React from "react";
import data from "../../public/data.json";
import TaskList from "../components/TaskList/TaskList";
type Props = {};
interface Task {
  listUserAsign: string[] | undefined;
  taskName: string | undefined;
  description: string | undefined;
  statusId: string | undefined;
  originalEstimate: number | undefined;
  timeTrackingSpent: number | undefined;
  timeTrackingRemaining: number | undefined;
  projectId: number | undefined;
  typeId: number | undefined;
  priorityId: number | undefined;
}
const backlog = (props: Props) => {
  const list: Task[] = data.tasks;

  return (
    <div>
      <h1>Backlog</h1>
      <TaskList list={list} />
    </div>
  );
};

export default backlog;
