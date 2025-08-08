/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskDetailsClient from "./TaskDetailsClient";

function hasValidParams(params: any): params is { id: string } {
  return params && typeof params.id === 'string';
}

export default function TaskDetailsPage({ params }: any) {
  if (!hasValidParams(params)) {
    return <p>Invalid task ID</p>;
  }
  return <TaskDetailsClient taskId={params.id} />;
}