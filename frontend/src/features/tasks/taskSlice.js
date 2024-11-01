import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Action asynchrone pour récupérer les tâches
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await api.get('/tasks');
    return response.data;
});

// Action asynchrone pour ajouter une nouvelle tâche
export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
});

// Action asynchrone pour mettre à jour une tâche
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedData }) => {
    const response = await api.put(`/tasks/${id}`, updatedData);
    return response.data;
});

// Action asynchrone pour supprimer une tâche
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((task) => task.id !== action.payload);
            });
    },
});

export default taskSlice.reducer;
