import React, { useState } from 'react';
import api from '../api/axios';

function NewTaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/tasks', {
                title,
                description,
                due_date: dueDate,
            });
            onTaskCreated(response.data);
        } catch (error) {
            console.error("Erreur lors de la création de la tâche", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Ajouter</button>
        </form>
    );
}

export default NewTaskForm;
