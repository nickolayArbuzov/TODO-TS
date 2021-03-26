import { TaskStateType } from '../AppWithRedux';
import { v1 } from 'uuid';
import { AddTodolistActionType, 
    RemoveTodolistActionType, 
    todolistId1, 
    todolistId2 } from './todoListReducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string 
    isDone: boolean 
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string 
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType 
| ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TaskStateType = {
    [todolistId1]: [
        { id: v1(), title: 'css', isDone: true },
        { id: v1(), title: 'html', isDone: true },
        { id: v1(), title: 'react', isDone: true },
        { id: v1(), title: 'redux', isDone: false },
        { id: v1(), title: 'node', isDone: false }
    ],
    [todolistId2]: [
        { id: v1(), title: 'book', isDone: false },
        { id: v1(), title: 'milk', isDone: true }
    ]
}

export const taskReducer = (state: TaskStateType = initialState, action: ActionsType) : TaskStateType => {
    switch(action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK':{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTask = { id: v1(), title: action.title, isDone: false};
            const updatedTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = updatedTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS':{
            const stateCopy = state;
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE':{
            const stateCopy = state;
            const tasks = stateCopy[action.todolistId];
            const findTask = tasks.find(t => t.id === action.taskId);
            if (findTask) {
                findTask.title = action.title
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST':{
            const stateCopy = state;
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST':{
            const stateCopy = state;
            delete stateCopy[action.id];
            return stateCopy;
        }
        default: 
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}