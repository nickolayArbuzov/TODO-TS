import { TaskStateType, FilterValuesType } from '../App';
import { v1 } from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

type ActionsType = RemoveTaskActionType

export const taskReducer = (state: TaskStateType, action: ActionsType) : Array<TaskStateType> => {
    switch(action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        default: 
            throw new Error('Incorrect action-type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
