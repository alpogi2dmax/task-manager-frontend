'use client'

import TaskDetailsClient from "./TaskDetailsClient"

interface PageProps {
  params: {
    id: string
  }
}

export default function TaskDetailsPage({ params }: PageProps) {
  return <TaskDetailsClient taskId={params.id} />
}