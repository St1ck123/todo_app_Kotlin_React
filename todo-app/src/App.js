import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todos/:id" element={<TodoDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;