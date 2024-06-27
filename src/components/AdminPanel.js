import axios from "axios";
import AdminTodo from "./AdminTodo";
import AdminUsers from "./AdminUsers";
import TaskForm from "./TaskForm";
import { useState, useEffect } from "react";


const AdminPanel = () => {
    const [editingTodo, setEditingTodo] = useState(null);
    const [id, setId] = useState('');

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
    }

    const handleReset = () => {
        setEditingTodo(null);
    }

    const handleIdChange = (id) => {
        setId(id)
    }

    return (
        <>

            <main>
            <h3 className="my-2 text-center">Список задач для пользователя</h3>
                <AdminUsers onChange={handleIdChange}/>
                <AdminTodo setTodo={handleEditTodo} id={id}/>
            </main>
            <aside>
                <TaskForm todo={editingTodo} reset={handleReset}/>
            </aside>
        </>
        
    )
} 

export default AdminPanel;

