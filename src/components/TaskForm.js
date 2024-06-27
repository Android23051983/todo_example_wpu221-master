import { useState, useEffect } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/tasks";

const TaskForm = ({todo, reset}) => {
    //создаем состояние todos с нвалным значением [], которое будет изменяться при вызове setTodos
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [stop, setStop] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setStart(todo.start);
            setStop(todo.stop);
            setPriority(todo.priority);
        }
    },[todo]);

      //добавление/изменение задачи
        const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
            e.preventDefault();
        try {
            if (todo) {
                const response = await axios.put(
                    `${serverUrl}/${todo.id}`,
                    {
                        title,
                        description,
                        start,
                        stop,
                        priority,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data.message);
                setTitle("");
                setDescription("");
                setStart("");
                setStop("");
                setPriority("");
            } else {
                const response = await axios.post(
                    serverUrl,
                    {
                        title,
                        description,
                        start,
                        stop,
                        priority,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data.message);
                setTitle("");
                setDescription("");
                setStart("");
                setStop("");
                setPriority("");
            }
            reset();
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    };

    return (
        <div className="text-center border border-light border-3 p-3">
            <h3>Задачи в БД </h3>
            <form className="" onSubmit={handleSubmit}>
                <div className="">
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название задачи..."
                    />

                    <textarea
                        type="text"
                        className="form-control mb-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Дополнительные сведения..."
                    ></textarea>

                    <input
                        type="datetime-local"
                        className="form-control mb-2"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />

                    <input              
                        type="datetime-local"
                        className="form-control mb-2"
                        value={stop}
                        onChange={(e) => setStop(e.target.value)}
                    />

                    <select className="form-control mb-2" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="" disabled>Выберите приоритет...</option>
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>

                    <button
                        className="btn btn-light"
                        type="submit"
                    >
                        {todo ? "Изменить" : "Добавить"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
