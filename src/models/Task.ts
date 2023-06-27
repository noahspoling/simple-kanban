
export class Task {

    taskId: number;
    columnId: number;
    taskName: string;

    constructor(taskId: number, columnId: number, taskName:string) {
        this.columnId = columnId;
        this.taskId = taskId;
        this.taskName = taskName;
    }

    getTaskId() {
        return this.taskId;
    }
    setTaskId(taskId: number) {
        this.taskId = taskId;
    }
    getColumnId() {
        return this.columnId;
    }
    setColumnId(columnId: number) {
        this.columnId = columnId;
    }
    getTaskName() {
        return this.taskName;
    }
    setTaskName(taksName: string) {
        this.taskName = taksName;
    }
}