import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import TaskColumn from '../components/TaskColumn';
import NewTaskForm from '../components/NewTaskForm';

function TaskBoard() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);

    useEffect(() => {
        dispatch(fetchTasks()); // Charger les tâches au chargement du tableau de bord
    }, [dispatch]);

    return (
        <div className="flex flex-wrap p-6 bg-gray-100 min-h-screen">
            {/* Colonne "À faire" */}
            <TaskColumn tasks={tasks.filter(task => !task.status)} title="À faire" />

            {/* Colonne "Complétées" */}
            <TaskColumn tasks={tasks.filter(task => task.status)} title="Complétées" />

            <NewTaskForm />
        </div>
    );
}

export default TaskBoard;
