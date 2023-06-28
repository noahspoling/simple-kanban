import React from "react";
import Modal from 'react-modal';

type ModalProps = {
    isOpen: boolean;
    columnId: number;
    onClose: () => void;
    addTask: (columnId: number, taskName: string) => void;
}

Modal.setAppElement('#root');

const MyModal = (props : ModalProps) => {
  const [taskName, setTaskName] = React.useState("")

  const handleSubmit = (event: React.FormEvent) => {
    console.log("Test")
    event.preventDefault();
    handleAddTask()
    props.onClose()
  }

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
    
  }

  const handleAddTask = () => {
    props.addTask(props.columnId, taskName);
    setTaskName("");
  }
  return (
    <Modal 
    isOpen={props.isOpen} 
    onRequestClose={props.onClose} 
    className="flex items-center justify-center outline-none border-0"
    overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50"
  >
    <div className="bg-white p-6 rounded shadow-lg w-3/4 mt-20">
      <h2 className="text-2xl font-bold text-black mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-5">
          <label className="text-black px-2 w-[40%]">
            Task Name
          </label>
          <input className="p-1 w-[40%] bg-gray-400 border-none shadow-none outline-none focus:outline-none focus:ring-0 border-b-2 border-gray-200 focus:border-blue-500"
            onChange={handleTaskNameChange}
            value={taskName}
            type="text"
            name="textName"
            id="textName" />
        </div>
        
        <div className="flex justify-between items-center m- 5 ">
          <button
            onClick={props.onClose}
            className="bg-blue-500 p-2 rounded-md hover:bg-blue-700"
          >Cancel</button>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md hover:bg-blue-700"
          >Add</button>
        </div>
      </form>

      
    </div>
  </Modal>
  );
}

export default MyModal;
