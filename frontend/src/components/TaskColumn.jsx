import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ tasks, title }) {
    return (
        <div className="flex-1 min-w-[250px] p-2">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <div className="bg-white rounded shadow p-4">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
    );
}

export default TaskColumn;
