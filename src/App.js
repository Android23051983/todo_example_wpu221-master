import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Protected from "./components/Protected";
import AdminPanel from "./components/AdminPanel";
import { useEffect, useState } from "react";
import axios from "axios";

const serverUrl = "http://localhost:5000/protected";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [userrole, setUserRole] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(serverUrl, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsername(response.data.user.username);
                    setUserRole(response.data.user.role);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    setUserRole("");
                    setUsername("");
                }
            }
        };
        fetchData();
    });

    
const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
    setUserRole("");
};

    return (
        <Router>
            <Header 
                isAuthenticated={isAuthenticated}
                role={userrole}
                username={username}
                handleLogout={handleLogout}
                setUsername={setUsername}
                setUserRole={setUserRole}
            />
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" 
                element={
                <Login
                    setIsAuthenticated={setIsAuthenticated}
                    setUsername={setUsername}
                    setUserRole={setUserRole}
                />
                }
                />
                <Route path="/tasks" element={<Todo />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route 
                    path = "/protected"
                    element={
                        <Protected
                            isAuthenticated={isAuthenticated}
                            username={username}
                            role={userrole}
                        />
                    }
                />
            </Routes>    
        </Router>
    );
}

export default App;
