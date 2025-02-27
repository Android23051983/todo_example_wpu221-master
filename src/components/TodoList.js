import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "date-fns";
import { VscEdit } from "react-icons/vsc";
import { VscTrash } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";

const serverUrl = "http://localhost:5000/tasks";

const TodoList = ({setTodo}) => {
    //создаем состояние todos с нвалным значением [], которое будет изменяться при вызове setTodos
    const [todos, setTodos] = useState([]);

    //сработает один раз при открытии компонента и при изменении состояния todos
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(serverUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                    setTodos(response.data);
            } catch (error) {
                console.error("Ошибка получения данных: ", error);
            }
        };
        fetchData();
    }, [todos]);

    const handleEditClick = (todo) => {
        setTodo(todo);
    }

    const handleCompleteClick = async(todo) => {
        const token = localStorage.getItem("token");
        const completed = !todo.completed;
        try {
            const response = await axios.put(
                `${serverUrl}/complete/${todo.id}`,
                {
                    completed
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data.message);
        } catch (error) {
            console.error("Ошибка: ", error);
        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${serverUrl}/${id}`)
            //собираем задачи, которые не нужно удалять
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
        } catch (error) {
            console.error("Ошибка удаления задачи: ", error);
        }
    };

    const setPriorityColor = (priority) => {
        switch(priority) {
            case "Low":
                return "table-success";
            case "Medium":
                return "table-warning";
            case "High":
                return "table-danger";
            default:
                return ""; 
        }
    }

    return (
        <div className="text-center ">
            <h3 className="my-2">Список задач</h3>
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Старт выполнения</th>
                        <th>Окончание выполнения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className={setPriorityColor(todo.priority)}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>
                            {
                                todo.start ? format(new Date(todo.start), "dd.MM.yyyy HH:mm") : ""
                            }
                            </td>
                            <td>
                            {
                                todo.stop ? format(new Date(todo.stop), "dd.MM.yyyy HH:mm") : ""
                            }
                            </td>
                            <td>
                                <div className="d-flex justify-content-evenly">
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleCompleteClick(todo)}
                                >
                                    <VscCheck />
                                </button>
                                <button 
                                className="btn btn-warning" 
                                onClick={() => handleEditClick(todo)}>
                                    <VscEdit />
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>handleDeleteTodo(todo.id)}
                                >
                                    <VscTrash />
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        
    );
};

export default TodoList;
