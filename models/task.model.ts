export class Task {
  id: number;
  task_name: string;
  priority?: number;
  completion_status?: boolean;
  project_id?: number;
  time_spent?: number;
  created_at?: Date;

  constructor(id: number, task_name: string, priority?: number, completion_status?: boolean, project_id?: number, time_spent?: number, created_at?: Date) {
      this.id = id;
      this.task_name = task_name;
      this.priority = priority;
      this.completion_status = completion_status;
      this.project_id = project_id;
      this.time_spent = time_spent;
      this.created_at = created_at;
  }

  addTimeSpent(time: number) {
    this.time_spent = (this.time_spent ?? 0) + time;
}

updateCreatedAt(newDate: Date) {
    this.created_at = newDate;
}

updateCompletionStatus(status: boolean) {
    this.completion_status = status;
}

renameTask(newName: string) {
    this.task_name = newName;
}

editTaskDetails(newName: string, newPriority?: number, newProjectId?: number) {
  this.task_name = newName;
  if (newPriority !== undefined) {
      this.priority = newPriority;
  }
  if (newProjectId !== undefined) {
      this.project_id = newProjectId;
  }
}
}