import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "date-fns";
import { VscEdit, VscTrash } from "react-icons/vsc";

const serverUrl = "http://localhost:5000/admin";

const AdminTodo = ({setTodo, id}) => {
    //создаем состояние todos с нвалным значением [], которое будет изменяться при вызове setTodos
    const [todos, setTodos] = useState([]);
    console.log(id)
    //сработает один раз при открытии компонента и при изменении состояния todos
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
                );
                    setTodos(response.data);
            } catch (error) {
                console.error("Ошибка получения данных: ", error);
            }
        };
        fetchData();
    }, [todos, id]);

    const handleEditClick = (todo) => {
        setTodo(todo);
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
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Старт выполнения</th>
                        <th>Окончание выполнения</th>
                        <th>Статус</th>
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
                            {
                                todo.completed ? ("Завершено") : ("Не завершено")
                            }
                            </td>
                            <td>
                                <div className="d-flex justify-content-evenly">
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

export default AdminTodo;