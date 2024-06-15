import { useState } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/tasks";

const TaskForm = () => {
    //создаем состояние todos с нвалным значением [], которое будет изменяться при вызове setTodos
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [stop, setStop] = useState("");
    const [priority, setPriority] = useState("");

    //добавление задачи
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(serverUrl, {
                title,
                description,
                start,
                stop,
                priority,
            });
            console.log("ID добавленной задачи: ", response.data.id);
            setTitle("");
            setDescription("");
            setStart("");
            setStop("");
            setPriority("");
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="">
                    <input
                        type="text"
                        className=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название задачи..."
                    />

                    <textarea
                        type="text"
                        className=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Дополнительные сведения..."
                    ></textarea>

                    <input
                        type="datetime-local"
                        className=""
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />

                    <input              
                        type="datetime-local"
                        className=""
                        value={stop}
                        onChange={(e) => setStop(e.target.value)}
                    />

                    <select className="" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="" disabled>Выберите приоритет...</option>
                        <option value="Low">Низкий</option>
                        <option value="Medium">Средний</option>
                        <option value="High">Высокий</option>
                    </select>

                    <button
                        className=""
                        type="submit"
                    >
                        +
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
