import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_TODOS } from '../api';

function TodoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');

    useEffect(() => {
        fetch(`${API_TODOS}/${id}`)
            .then(r => {
                if (!r.ok) throw new Error(`Задача не найдена (${r.status})`);
                return r.json();
            })
            .then(data => {
                setTodo(data);
                setEditTitle(data.title);
                setEditDesc(data.description || '');
            })
            .catch(err => setError(err.message));
    }, [id]);

    async function handleSave() {
        if (!editTitle.trim()) return;
        try {
            const res = await fetch(`${API_TODOS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...todo, title: editTitle, description: editDesc })
            });
            if (!res.ok) throw new Error(`Ошибка сохранения (${res.status})`);
            const updated = await res.json();
            setTodo(updated);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleToggle() {
        try {
            const res = await fetch(`${API_TODOS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...todo, completed: !todo.completed })
            });
            if (!res.ok) throw new Error(`Ошибка (${res.status})`);
            const updated = await res.json();
            setTodo(updated);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete() {
        if (!window.confirm('Удалить задачу?')) return;
        try {
            const res = await fetch(`${API_TODOS}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`Ошибка удаления (${res.status})`);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) return <p className="error-message">Ошибка: {error}</p>;
    if (!todo) return <p>Загрузка...</p>;

    return (
        <div className="detail-container">
            <button className="btn back-btn" onClick={() => navigate('/')}>Назад</button>
            <h2>{todo.title}</h2>

            <div className="detail-desc">
                {todo.description
                    ? <p>{todo.description}</p>
                    : <span className="detail-no-desc">Описание отсутствует</span>}
            </div>

            <div className="detail-toggle">
                <div className="custom-checkbox" onClick={handleToggle}>
                    <div className={`custom-checkbox-inner ${todo.completed ? 'checked' : ''}`}>
                        {todo.completed && <span>✓</span>}
                    </div>
                    <span className={`detail-status ${todo.completed ? 'done' : 'pending'}`}>
                        {todo.completed ? 'ВЫПОЛНЕНО' : 'В РАБОТЕ'}
                    </span>
                </div>
            </div>

            {isEditing ? (
                <div className="detail-edit">
                    <div className="modal-label">Название</div>
                    <input
                        className="todo-input"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSave()}
                    />
                    <div className="modal-label" style={{ marginTop: '12px' }}>Описание</div>
                    <input
                        className="todo-input"
                        value={editDesc}
                        onChange={e => setEditDesc(e.target.value)}
                        placeholder="Описание..."
                    />
                    <div className="detail-edit-buttons">
                        <button className="btn todo-btn" onClick={handleSave}>Сохранить</button>
                        <button className="btn back-btn" onClick={() => setIsEditing(false)}>Отмена</button>
                    </div>
                </div>
            ) : (
                <>
                    <button className="btn todo-btn" onClick={() => setIsEditing(true)}>
                        Редактировать
                    </button>
                    <button className="btn delete-btn" onClick={handleDelete}>
                        Удалить
                    </button>
                </>
            )}
        </div>
    );
}

export default TodoDetail;