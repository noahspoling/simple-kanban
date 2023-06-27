import { Task } from "../models/Task"

type TaskProps = {
    task: Task
    moveTask: (taskId: number, columnId: number) => void;
    deleteTask: (taskId: number) => void;
    updateTask: (taskId: number, taskName: string) => void;
    variant: any;
}

export const TaskItem = (props: TaskProps) => {
    const handleDeleteEvent = () => {
        props.deleteTask(props.task.getTaskId());
    };

    return (
        <div className={`${props.variant.bg} mb-2 p-2 rounded-md`}>
            <div className="flex justify-between items-center">
                <p
                    className="text-xl"
                >{props.task.getTaskName()}</p>
                <button className={`flex items-center justify-center rounded-md text-sm ${props.variant.bgHover} w-5 h-5`}
                    onClick={handleDeleteEvent}
                >
                   X
                </button>
            </div>
            <div className="flex justify-between items-center m-5">
                {props.task.getColumnId() !== 0 &&
                    <button
                    className={`${props.variant.bgHover} rounded-sm`}
                    >Back</button>
                }
                
                {props.task.getColumnId() !==3 &&
                    <button
                    className={`${props.variant.bgHover} rounded-sm`}
                    >Forward</button>
                }
            </div>
            
        </div>
    )
}