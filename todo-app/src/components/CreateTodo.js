import { useState } from 'react';

function CreateTodo({ onClose, onAdd }) {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    function handleAdd() {
        if (!newTitle.trim()) {
            return;
        }
        onAdd(newTitle, newDesc);
        onClose();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>Новая задача</h2>

                <div>
                    <div className="modal-label">Название</div>
                    <input
                        className="todo-input"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        placeholder="Введите задачу..."
                        autoFocus
                    />
                </div>

                <div>
                    <div className="modal-label">Описание</div>
                    <input
                        className="todo-input"
                        value={newDesc}
                        onChange={e => setNewDesc(e.target.value)}
                        placeholder="Описание..."
                    />
                </div>

                <div className="modal-buttons">
                    <button className="btn todo-btn" onClick={handleAdd}>Добавить</button>
                    <button className="btn back-btn" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTodo;