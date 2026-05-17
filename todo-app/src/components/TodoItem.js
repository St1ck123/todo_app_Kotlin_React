import { Link } from 'react-router-dom';

function TodoItem({ todo, onToggle }) {
    let badgeClass = 'pending';
    let badgeText = 'В РАБОТЕ';
    if (todo.completed) {
        badgeClass = 'done';
        badgeText = 'ВЫПОЛНЕНО';
    }

    return (
        <div className="todo-item">
            <div
                onClick={() => onToggle(todo.id)}
                style={{ cursor: 'pointer', flexShrink: 0 }}
                className={`custom-checkbox-inner ${todo.completed ? 'checked' : ''}`}
            >
                {todo.completed && <span>✓</span>}
            </div>

            <div className="todo-item-body">
                <Link to={`/todos/${todo.id}`} className="todo-item-title">
                    {todo.title}
                </Link>

                {todo.description && (
                    <div className="todo-item-desc">{todo.description}</div>
                )}
            </div>

            <span className={`todo-item-badge ${badgeClass}`}>
                {badgeText}
            </span>
        </div>
    );
}

export default TodoItem;