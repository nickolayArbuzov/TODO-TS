import React, { useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC } from './state/tasksReducer';
import { AppRootState } from './state/store';
import { Task } from './Task';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
    changeTitleTodolist: (todolistId: string, newValue: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => {
        return state.tasks[props.id];
    })

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),[props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),[props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),[props.changeFilter, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(props.id, newTitle);
    },[props.changeTitleTodolist, props.id])

    let tasksForTODO = tasksObj;
    if (props.filter === 'completed'){
        tasksForTODO = tasksForTODO.filter(t => t.isDone === true);
    }
    if (props.filter === 'active'){
        tasksForTODO = tasksForTODO.filter(t => t.isDone === false);
    }  

    return <div>
                <h3> <EditableSpan title={props.title} onChange={changeTitleTodolist}/> <IconButton onClick={removeTodolist} aria-label="delete"><DeleteIcon /></IconButton> </h3>
                <AddItemForm addItem={useCallback(title => dispatch(addTaskAC(title, props.id)), [dispatch, props.id])}/>
                <div>
                    {
                        tasksForTODO.map(t => {
                            return <Task task={t} todolistId={props.id} key={t.id}/>
                        })
                    }
                </div>
                <div style={{padding: '10px'}}>
                    <Button color={props.filter === 'all' ? 'primary' : 'inherit'} 
                            variant="contained" onClick={onAllClickHandler}>All</Button>
                    <Button color={props.filter === 'active' ? 'primary' : 'inherit'} 
                            variant="contained" onClick={onActiveClickHandler}>Active</Button>
                    <Button color={props.filter === 'completed' ? 'primary' : 'inherit'} 
                            variant="contained" onClick={onCompletedClickHandler}>Completed</Button>
                </div>
        </div>
})