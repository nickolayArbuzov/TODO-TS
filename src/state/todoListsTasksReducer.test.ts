import { v1 } from 'uuid';
import { TodolistType, TaskStateType } from '../App';
import { addTodolistAC } from './todoListReducer';
import { taskReducer } from './tasksReducer';
import { todoListReducer } from './todoListReducer';

test('id should be equals', () => {
    const startTasksState: Array<TaskStateType> = {}
    const startTodolistsState: Array<TodolistType> = {}
    const action = addTodolistAC('title')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
})