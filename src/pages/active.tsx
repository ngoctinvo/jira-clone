import React from "react";
import AppLayout from "../containers/AppLayout";
import { ReactElement, useEffect } from "react";
import Column from "../components/Column/Column";
import data from "../../public/data.json";
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

type Props = {};

const Active = (props: Props) => {
  const list: Task[] = data.tasks;

  return (
    <div className="flex flex-row">
      <Column title="TO DO" list={list} />
      <Column title="DOING" list={list} />
      <Column title="TESTING" list={list} />
      <Column title="DONE" list={list} />
    </div>
  );
};

export default Active;
