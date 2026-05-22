import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import { API_TODOS } from '../api';

const TODOS_PER_PAGE = 9;

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(API_TODOS)
            .then(r => {
                if (!r.ok) throw new Error(`Ошибка сервера: ${r.status}`);
                return r.json();
            })
            .then(data => {
                setTodos(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    async function handleAdd(title, description) {
        try {
            const res = await fetch(API_TODOS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, completed: false })
            });
            if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
            const newTodo = await res.json();
            setTodos(prev => [...prev, newTodo]);
            setCurrentPage(1);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleToggle(id) {
        try {
            const todo = todos.find(t => t.id === id);
            const res = await fetch(`${API_TODOS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...todo, completed: !todo.completed })
            });
            if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
            const updated = await res.json();
            setTodos(todos.map(t => t.id === id ? updated : t));
        } catch (err) {
            setError(err.message);
        }
    }

    const totalPages = Math.ceil(todos.length / TODOS_PER_PAGE);
    const startIndex = (currentPage - 1) * TODOS_PER_PAGE;
    const visibleTodos = todos.slice(startIndex, startIndex + TODOS_PER_PAGE);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="error-message">Ошибка: {error}</p>;

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h1>Мои задачи</h1>
                <button className="btn todo-btn" onClick={() => setIsCreateOpen(true)}>
                    Добавить задачу
                </button>
            </div>

            {isCreateOpen && (
                <CreateTodo onClose={() => setIsCreateOpen(false)} onAdd={handleAdd} />
            )}

            {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
            ))}

            <div className="pagination">
                <button
                    className="btn page-btn"
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1 || todos.length === 0}
                >
                    Назад
                </button>
                <span className="page-info">
                    {todos.length === 0 ? '—' : `${currentPage} / ${totalPages}`}
                </span>
                <button
                    className="btn page-btn"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage >= totalPages || todos.length === 0}
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
}

export default TodoList;