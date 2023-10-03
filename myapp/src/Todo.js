import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
    };

    const handleSubmit = async () => {
        if(task !== '') {
            const newTodo = { task };
            const response = await axios.post('http://localhost:8080/api/todos', newTodo);
            setTodos([...todos, response.data]);
            setTask('');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Add a task..." 
                value={task} 
                onChange={e => setTask(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
