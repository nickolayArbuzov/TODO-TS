import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolistsApi'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {  
        todolistsAPI.getTodolists()
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('todolist')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolist('id')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolistTitle('id', 'uptodo')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {  
        todolistsAPI.getTasks('todolist')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('todolist')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then ((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)} 
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>Delete</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolistTitle('id', 'uptodo')
            .then ((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}