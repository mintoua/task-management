<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        /*$tasks = Task::all();*/
        $tasks = auth()->user()->tasks()->orderBy('created_at', 'desc')->get()->toArray();
        return response()->json($tasks,200);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => false,
            'user_id' => $request->user()->id,
            'created_at' => now()
        ]);

        return response()->json($task, 201);
    }

    public function show($id)
    {
        return auth()->user()->tasks()->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $task = auth()->user()->tasks()->findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        auth()->user()->tasks()->findOrFail($id)->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
