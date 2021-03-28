import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC, 
    removeTaskAC, 
    changeTaskStatusAC, 
    changeTaskTitleAC } from './state/tasksReducer';
import { AppRootState } from './state/store';

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
    console.log('рендер туду')
    const dispatch = useDispatch();
    const tasksObj = useSelector<AppRootState, Array<TaskType>>(state => {
        return state.tasks[props.id];
    })

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTitleTodolist = (newTitle: string) => {
        props.changeTitleTodolist(props.id, newTitle);
    }

    let tasksForTODO = tasksObj;
    if (props.filter === 'completed'){
        tasksForTODO = tasksForTODO.filter(t => t.isDone === true);
    }
    if (props.filter === 'active'){
        tasksForTODO = tasksForTODO.filter(t => t.isDone === false);
    }  

    return <div>
                <h3> <EditableSpan title={props.title} onChange={changeTitleTodolist}/> <IconButton onClick={removeTodolist} aria-label="delete"><DeleteIcon /></IconButton> </h3>
                <AddItemForm addItem={useCallback(title => dispatch(addTaskAC(title, props.id)), [])}/>
                <div>
                    {
                        tasksForTODO.map(t => {
                            const onRemoveHandler = () => {
                                dispatch(removeTaskAC(t.id, props.id));
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id));
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                            }
                            return <div key={t.id} className={t.isDone ? 'isDone' : ''}> -
                                <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} color="primary"/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler} aria-label="delete"><DeleteIcon /></IconButton>
                            </div>
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