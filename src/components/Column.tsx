import React from "react";
import { Task } from "../models/Task"
import Popup from "./AddPopup";
import { TaskItem } from "./TaskItem"

import {BiMessageSquareAdd} from "react-icons/bi"

type ColumnProps = {
    columnId: number;
    columnName: string;
    columnColor: "blue" | "yellow" | "red" | "green";
    tasks: Task[];
    addTask: (columnId: number, taskName: string) => void;
    moveTask: (taskId: number, columnId: number) => void;
    deleteTask: (taskId: number) => void;
    updateTask: (taskId: number, taskName: string) => void;
}

export const Column = (props: ColumnProps) => {

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    /*
        Tailwind column color variant settings
     */
    const variants =  {
        blue : {
            bg : "bg-blue-500",
            bgAccent: "bg-blue-300",
            bgHover: "hover:bg-blue-300"
        },
        yellow : {
            bg : "bg-yellow-500",
            bgAccent: "bg-yellow-200",
            bgHover: "hover:bg-yellow-200"
        },
        red : {
            bg : "bg-red-500",
            bgAccent: "bg-red-300",
            bgHover: "hover:bg-red-300"
        },
        green: {
            bg : "bg-green-500",
            bgAccent: "bg-green-200",
            bgHover: "hover:bg-green-200"
        }
        
    }
    let variant = variants[props.columnColor];

    return (
        <>
            <div>
                <div className={`${variant.bg} rounded-tl-md rounded-tr-md px-5 py-2`}>
                    <div className="flex justify-between items-center">
                        <p className=" text-2xl text-center">{props.columnName}</p>
                        <button className={`flex items-center justify-center rounded-md text-xl ${variant.bgHover} w-5 h-5`}
                            onClick={handleOpenModal}>
                            <BiMessageSquareAdd/>
                        </button>
                    </div>
                    <Popup isOpen={modalOpen} columnId={props.columnId} onClose={handleCloseModal} addTask={props.addTask}></Popup>
                </div>

                <div className={`overflow-auto ${variant.bgAccent} rounded-br-sm rounded-bl-sm h-50`}>
                    <ul className="p-2">
                        {props.tasks.map(task => {
                            return (
                                <TaskItem
                                    task={task}
                                    moveTask={props.moveTask}
                                    deleteTask={props.deleteTask}
                                    updateTask={props.updateTask}
                                    variant={variant}
                                />
                            )
                        })}
                    </ul>
                </div>

            </div>  
            
        </>
    )
}