import { useState } from 'react';

function Create({ onClose, onAdd }) {
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
                    <button className="todo-btn" onClick={handleAdd}>Добавить</button>
                    <button className="back-btn" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default Create;