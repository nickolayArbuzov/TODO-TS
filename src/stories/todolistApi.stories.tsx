import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiKey} from '../apiKey'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': apiKey
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {  
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', 
            {title: 'todolist'}, settings)
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'id';
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, 
            settings)
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'id';
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, 
            {title: 'uptodolist'}, settings)
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}