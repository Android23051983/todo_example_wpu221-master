import TaskForm from "./TaskForm"
import TodoList from "./TodoList"
import { useState } from "react"

const Todo = () => {
    const [editingTodo, setEditingTodo] = useState(null);

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
    }

    const handleReset = () => {
        setEditingTodo(null);
    }

    return (
        <>
            <main>
                <TodoList setTodo={handleEditTodo}/>
            </main>
            <aside>
                <TaskForm todo={editingTodo} reset={handleReset}/>
            </aside>
        </>
        
    )
} 

export default Todo;