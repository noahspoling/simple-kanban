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
    const [nextTaskId, setNextTaskId] = React.useState(0);
    const [tasks, setTasks] = React.useState(() => {
        const tasksJson = localStorage.getItem("tasks");

        if(tasksJson) {
            const tasksArray = JSON.parse(tasksJson);
            const tasksObj = tasksArray.map((task: any) => new Task(task.taskId, task.columnId, task.taskName));
            return tasksObj
        }
        else {
            return []
        }
    })

    React.useEffect(() => {
        console.log("Save")
        console.log(tasks);
        saveTasks();
      }, [tasks]);
    
    React.useEffect(() => {
        console.log("Load")
        console.log(tasks);
        loadTasks();
    }, []);
      
    const addTask = (columnId: number, taskName: string) => {
        const newTask = new Task(nextTaskId, columnId, taskName);
        setTasks([...tasks, newTask]);
        setNextTaskId(nextTaskId + 1);
    };

    const moveTask = (taskId: number, columnId: number) => {
        setTasks(tasks.map((task: any) =>
            task.getTaskId() === taskId
            ? new Task(taskId, columnId, task.getTaskName())
            : task
        ));
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task: any) => task.getTaskId() !== taskId))
    };

    const updateTask = (taskId: number, taskName: string) => {
        setTasks(tasks.map((task: any) =>
            task.getTaskId() === taskId
            ? new Task(taskId, task.getColumnId(), taskName)
            : task
        ));
    };

    const saveTasks = () => {
        const tasksJson = JSON.stringify(tasks);

        localStorage.setItem("tasks", tasksJson);
    };

    const loadTasks = () => {
        const tasksJson = localStorage.getItem("tasks");

        if(tasksJson) {
            let i : number
            i = 0;
            const tasksArray = JSON.parse(tasksJson);
            const tasksObj = tasksArray.map((task: Task) => {
                const taskM = new Task(i, task.columnId, task.taskName)
                i++;
                return taskM;
            })
            setTasks(tasksObj)
            setNextTaskId(tasks.length)
        }
    }

    
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
        <div className="flex flex-col sm:flex-row sm:flex-1 gap-5 justify-center mx-5">
            {Object.keys(board.columns).map((columnId, index) => {
                const column = board.columns[columnId];
                return (
                    <div className="md:max-w-[24%]" key={index}>
                        <Column
                            columnId={column.columnId}
                            columnName={column.columnName}
                            columnColor={column.columnColor}
                            tasks={tasks.filter((task: any) => task.getColumnId() === parseInt(columnId))}
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