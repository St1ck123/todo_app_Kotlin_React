import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = 'http://localhost:8080/todos';

function TodoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(r => r.json())
            .then(data => {
                setTodo(data);
                setEditTitle(data.title);
                setEditDesc(data.description || '');
            });
    }, [id]);

    async function handleSave() {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, title: editTitle, description: editDesc })
        });
        const updated = await res.json();
        setTodo(updated);
        setIsEditing(false);
    }

    async function handleToggle() {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, completed: !todo.completed })
        });
        const updated = await res.json();
        setTodo(updated);
    }

    async function handleDelete() {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        navigate('/');
    }

    if (!todo) return <p>Загрузка...</p>;

    return (
        <div className="detail-container">
            <button className="back-btn" onClick={() => navigate('/')}>Назад</button>
            <h2>{todo.title}</h2>
            <div className="detail-desc">
                {todo.description
                    ? <p>{todo.description}</p>
                    : <span className="detail-no-desc">Описание отсутствует</span>}
            </div>
            <label className="detail-toggle">
                <div className="custom-checkbox" onClick={handleToggle}>
                    <div className={`custom-checkbox-inner ${todo.completed ? 'checked' : ''}`}>
                        {todo.completed && <span>✓</span>}
                    </div>
                    <span className={`detail-status ${todo.completed ? 'done' : 'pending'}`}>
                        {todo.completed ? 'ВЫПОЛНЕНО' : 'В РАБОТЕ'}
                    </span>
                </div>
            </label>
            {isEditing ? (
                <div className="detail-edit">
                    <div className="modal-label">Название</div>
                    <input className="todo-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                    <div className="modal-label" style={{ marginTop: '12px' }}>Описание</div>
                    <input className="todo-input" value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Описание..." />
                    <div className="detail-edit-buttons">
                        <button className="todo-btn" onClick={handleSave}>Сохранить</button>
                        <button className="back-btn" onClick={() => setIsEditing(false)}>Отмена</button>
                    </div>
                </div>
            ) : (
                <button className="todo-btn" onClick={() => setIsEditing(true)}>Редактировать</button>
            )}
            <button className="delete-btn" onClick={handleDelete}>Удалить</button>
        </div>
    );
}

export default TodoDetail;