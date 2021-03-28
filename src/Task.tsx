import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import { removeTaskAC, 
    changeTaskStatusAC, 
    changeTaskTitleAC } from './state/tasksReducer';
import { TaskType } from './Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId));
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },[dispatch, props.task.id, props.todolistId])
    return <div key={props.task.id} className={props.task.isDone ? 'isDone' : ''}> -
        <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} color="primary"/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler} aria-label="delete"><DeleteIcon /></IconButton>
    </div>
})