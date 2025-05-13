import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://todo-app-fullstack-993x.onrender.com/api/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(API_BASE, { text: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`${API_BASE}/${id}`, { text: editText });
      setEditTodoId(null);
      setEditText("");
      fetchTodos();
    } catch (err) {
      console.error("Error editing todo", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">📝 Fullstack Todo App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="px-4 py-2 border rounded shadow-sm w-64"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow p-4 space-y-3">
        {todos.length === 0 && (
          <p className="text-center text-gray-500">No todos yet.</p>
        )}
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between items-center border-b pb-2">
            {editTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 rounded w-2/3"
                />
                <button
                  onClick={() => handleEdit(todo._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTodoId(null)}
                  className="text-red-500 ml-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-800">{todo.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditTodoId(todo._id);
                      setEditText(todo.text);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
