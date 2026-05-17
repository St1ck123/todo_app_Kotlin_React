import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Create from './CreateDo';

const API = 'http://localhost:8080/todos';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 9;

    useEffect(() => {
        fetch(API)
            .then(r => r.json())
            .then(data => {
                setTodos(data);
                setLoading(false);
            });
    }, []);

    async function handleAdd(title, description) {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed: false })
        });
        const newTodo = await res.json();
        setTodos([newTodo, ...todos]);
    }

    async function handleToggle(id) {
        const todo = todos.find(t => t.id === id);
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, completed: !todo.completed })
        });
        const updated = await res.json();
        setTodos(todos.map(t => t.id === id ? updated : t));
    }

    const totalPages = Math.ceil(todos.length / todosPerPage);
    const startIndex = (currentPage - 1) * todosPerPage;
    const visibleTodos = todos.slice(startIndex, startIndex + todosPerPage);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h1>Мои задачи</h1>
                <button className="todo-btn" onClick={() => setIsCreateOpen(true)}>
                    Добавить задачу
                </button>
            </div>

            {isCreateOpen && (
                <Create onClose={() => setIsCreateOpen(false)} onAdd={handleAdd} />
            )}

            {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
            ))}

            <div className="pagination">
                <button className="page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Назад</button>
                <span className="page-info">{currentPage} / {totalPages}</span>
                <button className="page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Вперёд</button>
            </div>
        </div>
    );
}

export default TodoList;