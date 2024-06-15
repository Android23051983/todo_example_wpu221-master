import logo from "./logo.svg";

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";

function App() {
    return (
        <div className="container">
            <Header />
            <main>
            <TodoList />
            </main>
            <aside>
            <TaskForm />
            </aside>
        </div>
    );
}

export default App;
