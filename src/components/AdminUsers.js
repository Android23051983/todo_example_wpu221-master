import axios from "axios";
import { useState, useEffect } from "react";

const serverUrl = "http://localhost:5000/users";

const AdminUsers = ({onChange}) => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(serverUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                    setUsers(response.data);
            } catch (error) {
                console.error("Ошибка получения данных: ", error);
            }
        };
        fetchData();
    }, [users]);

    const handleIdChange =(e) => {
        onChange(e.target.value)
    }

    return (
        <div className="text-center p-3">
                <div className="">
                    <select className="form-control mb-2" onChange={handleIdChange}>
                    <option value="" disabled selected>Выберите приоритет...</option>
                    {users.map((user) => (
                        <option value={user.id}>{user.username}</option>
                    ))}
                    </select>
                </div>
        </div>
    );
};


export default AdminUsers;