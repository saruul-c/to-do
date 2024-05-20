export class Task {
  id: number;
  task_name: string;
  completion_status: boolean;
  time_spent: number;
  created_at: Date;

  constructor(
    id: number,
    task_name: string,
    completion_status: boolean = false,
    time_spent: number = 0,
    created_at: Date = new Date()
  ) {
    this.id = id;
    this.task_name = task_name;
    this.completion_status = completion_status;
    this.time_spent = time_spent;
    this.created_at = created_at;
  }

  addTimeSpent(time: number) {
    this.time_spent += time;
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
}
