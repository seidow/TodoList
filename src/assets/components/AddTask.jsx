import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { ID, databases } from "../Backend/appwriteConfig";



const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;



function AddTask() {
  const [taskList, setTaskList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch tasks from Appwrite database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setTaskList(response.documents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toggleComplete = async (index) => {
    const task = taskList[index];
    const isCompletedNow = !task.isCompleted;

    try {
      const response = await databases.updateDocument(
        databaseId,
        collectionId,
        task.$id,
        { isCompleted: isCompletedNow }
      );

      const updatedTasks = [...taskList];
      updatedTasks[index] = response; // response contains updated task
      setTaskList(updatedTasks);
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  const handleSave = async (index) => {
    const trimmedEdit = editText.trim();

    const isDuplicate = taskList.some(
      (task, i) =>
        i !== index && task.task.toLowerCase() === trimmedEdit.toLowerCase()
    );

    if (!trimmedEdit || isDuplicate) {
      alert("Invalid or duplicate task.");
      return;
    }

    const taskId = taskList[index].$id;

    try {
      const updated = await databases.updateDocument(
        databaseId,
        collectionId,
        taskId,
        { task: trimmedEdit }
      );

      const updatedTasks = [...taskList];
      updatedTasks[index] = updated;
      setTaskList(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
      setEditText("");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(null);
    setEditText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = e.target.task.value.trim();

    const isDuplicate = taskList.some(
      (t) => t.task.toLowerCase() === task.toLowerCase()
    );

    if (!task || isDuplicate) {
      alert("Please enter a valid task or task already exists.");
      return;
    }

    try {
      // 1. Save to Appwrite
      const response = await databases.createDocument(
        databaseId, // Replace with your actual DB ID
        collectionId, // Replace with your actual Collection ID
        ID.unique(),
        {
          task,
          isCompleted: false,
        }
      );

      // 2. Then update your local state with what's returned (optional but useful)
      setTaskList([...taskList, response]);
      e.target.task.value = "";
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleDelete = async (index) => {
    const taskId = taskList[index].$id;

    try {
      await databases.deleteDocument(
        databaseId,
        collectionId,
        taskId
      );

      const newTaskList = taskList.filter((_, i) => i !== index);
      setTaskList(newTaskList);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="m-8 sm:mt-32 min-w-[330px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch border bg-gray-800 rounded-lg overflow-hidden font-poppins text-white w-full max-w-4xl mx-auto"
      >
        {/*dd a task */}
        <div className="flex-2 border-r border-gray-700">
          <input
            type="text"
            id="task"
            placeholder="Add a task"
            required
            className="w-full bg-gray-800 text-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Submit Button */}
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 transition-all px-6 cursor-pointer text-white font-semibold text-lg"
        >
          Add Task
        </button>
      </form>

      {taskList.map((task, index) => (
        <ul className="mt-8 mx-auto w-full max-w-4xl min-w-[330px]" key={index}>
          <li key={index} className="text-xl">
            <div className="border-b-2 border-amber-300 shadow-amber-50 shadow-sm rounded-2xl px-2 py-2 flex justify-center items-center">
              {isEditing && editIndex === index ? (
                <div className="flex w-full justify-center items-center">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="bg-transparent text-white p-2 focus:outline-none focus:ring-0 placeholder-gray-400 flex-1"
                  />
                  <div className="flex gap-2">
                    {/* Save Icon */}
                    <button onClick={() => handleSave(index)}>✅</button>

                    {/* Cancel Icon */}
                    <button
                      onClick={handleCancel}
                      className="text-red-600 text-4xl"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full justify-between items-center text-amber-50">
                  <p
                    className={task.isCompleted ? "px-4 line-through" : "px-4"}
                    onClick={() => toggleComplete(index)}
                  >
                    {task.task}
                  </p>
                  <div className="flex gap-4">
                    <MdModeEditOutline
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        setIsEditing(true);
                        setEditIndex(index);
                        setEditText(task.task);
                      }}
                    />
                    <MdDelete
                      className="text-red-400 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default AddTask;
