import { Task } from './Task'
import { action } from '@storybook/addon-actions'
import React from 'react'

export default {
    title: 'Task Component',
    component: Task
}

const callback = action('callback')

export const TaskBaseExample = () => {
    return <>
        <Task 
            task={ {id: '1', isDone: true, title: 'CSS'} }
            todolistId={'todolistId1'}
        />
        <Task 
            task={ {id: '2', isDone: false, title: 'JS'} }
            todolistId={'todolistId2'}
        />
    </>
}