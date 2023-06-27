import React from "react"
import { Column } from "./Column"
import { Task } from "../models/Task"

type BoardProps = {
    boardName: string
}

export const Board = (props: BoardProps) => {
    const [columns, setColumns] = React.useState([
        [], [], [], []
    ])
    const [nextTaskId, setNextTaskId] = React.useState(1);

    const [tasks, setTasks] = React.useState<Task[]>([
        new Task(1, 0, "Sleep"),
        new Task(2, 1, "Run"),
        new Task(3, 2, "Eat"),
        new Task(4, 3, "Other Task"),
        new Task(5, 1, "Read"),
        new Task(6, 1, "Task #1"),
        new Task(7, 2, "Task #2"),
        new Task(8, 3, "Task #3"),
        new Task(9, 0, "Task #4"),
    ])

    const addTask = (columnId: number, taskName: string) => {
        const newTask = new Task(nextTaskId, columnId, taskName);
        setTasks([...tasks, newTask]);
        setNextTaskId(nextTaskId + 1);
    };

    const moveTask = (taskId: number, columnId: number) => {
        setTasks(tasks.map(task =>
            task.getColumnId() === taskId
            ? new Task(taskId, columnId, task.getTaskName())
            : task
        ));
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.getTaskId() !== taskId))
    };

    const updateTask = (taskId: number, taskName: string) => {
        setTasks(tasks.filter(task =>
            task.getTaskId() === taskId
            ? new Task(taskId, task.getColumnId(), taskName)
            : task
        ));
    };
    
    const board = {
        columns: {
            0: {
                columnId: 0,
                columnName: "Todo",
                columnColor: "blue"
            },
            1: {
                columnId: 1,
                columnName: "Working",
                columnColor: "yellow"
            },
            2: {
                columnId: 2,
                columnName: "Stuck",
                columnColor: "red"
            },
            3: {
                columnId: 3,
                columnName: "Done",
                columnColor: "green"
            }
        }
    }

    return(
        <>
        <div className="flex flex-col sm:flex-row sm:flex-0 gap-4 md:justify-center mx-5">
            {Object.keys(board.columns).map((columnId, index) => {
                const column = board.columns[columnId];
                return (
                    <div className="w-full" key={index}>
                        <Column
                            columnId={column.columnId}
                            columnName={column.columnName}
                            columnColor={column.columnColor}
                            tasks={tasks.filter(task => task.getColumnId() === parseInt(columnId))}
                            addTask={addTask}
                            moveTask={moveTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    </div>
                )
            })}
        </div>
        </>
    )
}