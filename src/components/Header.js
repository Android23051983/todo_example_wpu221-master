import React from "react";
import {NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, role, username, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/login");
    };


    return (
        <nav className="py-3 px-5 bg-dark">
            <ul className="nav">
                {!isAuthenticated ? (
                    <>
                        <li className="nav-item ms-auto">
                            <NavLink
                                className="nav-link text-light"
                                to="/register"
                            >
                                Регистрация
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-light"
                                to="/login"
                            >
                                Вход
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-light"
                                aria-current="page"
                                to="/tasks"
                            >
                                Задачи
                            </NavLink>
                        </li>
                        
                        { role === "admin"  ?(    
                        <li className="nav-item ">
                            <NavLink
                            className="nav-link text-light"
                            aria-current="page"
                            to="/admin"
                        >
                            Панель администратора
                            </NavLink>
                        </li>
                ) : null}
                        <li className="nav-item ms-auto dropdown">
                            <button
                                className="btn btn-light"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {username}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <NavLink
                                        className="nav-link text-light dropdown-item"
                                        aria-current="page"
                                        to="/protected"
                                    >
                                        Пррофиль
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleLogoutClick}
                                    >
                                        Выйти
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;