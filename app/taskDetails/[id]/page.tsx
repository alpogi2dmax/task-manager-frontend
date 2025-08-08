import TaskDetailsClient from "./TaskDetailsClient"

export default function TaskDetailsPage({ params }: { params: { id: string }}) {
  return <TaskDetailsClient taskId={params.id} />
}