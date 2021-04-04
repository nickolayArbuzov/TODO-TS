import axios from 'axios'
import {apiKey} from '../apiKey'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}
export type TaskType = {
    description: string
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists(){
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string){
        return instance.post<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(title: string){
        return instance.post('todo-lists', {title: title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/${taskId}`)
    },
    updateTask(todolistId: string, title: string){
        return instance.post(`todo-lists/${todolistId}`, {title: title})
    },
}