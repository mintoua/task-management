import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';

function TaskCard({ task }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);

    // Fonction pour marquer une tâche comme complétée
    const handleComplete = () => {
        dispatch(updateTask({ id: task.id, updatedData: { status: true } }));
    };

    // Fonction pour supprimer une tâche
    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    // Fonction pour activer le mode édition
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Fonction pour sauvegarder les modifications de la tâche
    const handleSave = () => {
        dispatch(updateTask({
            id: task.id,
            updatedData: { title: updatedTitle, description: updatedDescription }
        }));
        setIsEditing(false);
    };

    return (
        <div className="bg-blue-100 p-4 rounded mb-2 shadow">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="w-full mb-2 p-1 border rounded"
                    />
                    <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="w-full mb-2 p-1 border rounded"
                    />
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Enregistrer</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Annuler</button>
                </>
            ) : (
                <>
                    <h3 className="font-bold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p className="text-sm text-gray-600">Échéance : {new Date(task.due_date).toLocaleDateString()}</p>
                    <div className="mt-2 flex">
                        {!task.status && (
                            <button onClick={handleComplete} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Compléter</button>
                        )}
                        <button onClick={handleEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Mettre à jour</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskCard;
