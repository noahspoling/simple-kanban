import { Task } from "../models/Task"
import { BiMessageSquareX, BiMessageEdit, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
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

    const handleMoveBack = () => {
        props.moveTask(props.task.getTaskId(), props.task.getColumnId() - 1);
    }

    const handleMoveForward = () => {
        props.moveTask(props.task.getTaskId(), props.task.getColumnId() + 1);
    }

    return (
        <div className={`${props.variant.bg} mb-2 p-2 rounded-md`}>
            <div className="flex justify-between items-center mb-6">
                <p
                    className="text-xl overflow-auto"
                >{props.task.getTaskName()}</p>
                
            </div>
            <div className="flex justify-between items-center m-2">
                {props.task.getColumnId() !== 0 &&
                    <button
                    onClick={handleMoveBack}
                    className={`${props.variant.bgHover} rounded-md p-2`}
                    >
                        <BiLeftArrowAlt/>
                    </button>
                }
                <button className={`flex items-center justify-center rounded-md text-sm ${props.variant.bgHover} w-5 h-5`}>
                    <BiMessageEdit/>
                </button>
                <button className={`flex items-center justify-center rounded-md text-sm ${props.variant.bgHover} w-5 h-5`}
                    onClick={handleDeleteEvent}
                >
                   <BiMessageSquareX/>
                </button>
                
                {props.task.getColumnId() !==3 &&
                    <button
                    onClick={handleMoveForward}
                    className={`${props.variant.bgHover} rounded-md p-2`}
                    >
                        <BiRightArrowAlt/>
                </button>
                }
            </div>
            
        </div>
    )
}