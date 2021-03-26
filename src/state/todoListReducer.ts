import { TodolistType, FilterValuesType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todoListReducer = (state: Array<TodolistType>, action: ActionsType) : Array<TodolistType> => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            return [{
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all'
                }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const findedTodolist = state.find(td => td.id === action.id);
            if(findedTodolist) {
                findedTodolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let todolist = state.find(td => td.id === action.id);
            if(todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
            
        default: 
            throw new Error('Incorrect action-type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}