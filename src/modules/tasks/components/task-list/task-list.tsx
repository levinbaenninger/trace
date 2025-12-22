"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "../../hooks/use-tasks";
import { TaskForm } from "../task-form";
import { TaskItem } from "../task-item";
import { TaskListEmpty } from "./task-list-empty";
import { TaskListLoading } from "./task-list-loading";

export const TaskList = () => {
  const { tasks, handleToggle, handleDelete } = useTasks();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TaskForm />

        <div className="space-y-2">
          {tasks === undefined && <TaskListLoading />}

          {tasks?.length === 0 && <TaskListEmpty />}

          {tasks?.map((task) => (
            <TaskItem
              id={task._id}
              isCompleted={task.isCompleted}
              key={task._id}
              onDelete={handleDelete}
              onToggle={handleToggle}
              text={task.text}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
