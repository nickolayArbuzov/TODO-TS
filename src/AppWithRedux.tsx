import React from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { changeTodolistFilterAC,
    changeTodolistTitleAC,
    addTodolistAC,
    removeTodolistAC } from './state/todoListReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => {
        return state.todolists;
    })

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }

    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                    News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(td => {
                        
                        return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist title={td.title} 
                                                key={td.id}
                                                id={td.id}
                                                changeFilter={changeFilter}                                   
                                                filter={td.filter}
                                                removeTodolist={removeTodolist}
                                                changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                    })
                }
            </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
