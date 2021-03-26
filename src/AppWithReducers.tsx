import React, { useReducer } from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
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
import { todoListReducer,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    addTodolistAC,
    removeTodolistAC } from './state/todoListReducer';
import { taskReducer, 
    addTaskAC, 
    removeTaskAC, 
    changeTaskStatusAC, 
    changeTaskTitleAC } from './state/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todoListReducer, [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ]);

    let [tasksObj, dispatchToTasksReducer] = useReducer(taskReducer, {
        [todolistId1]: [
            { id: v1(), title: 'css', isDone: true },
            { id: v1(), title: 'html', isDone: true },
            { id: v1(), title: 'react', isDone: true },
            { id: v1(), title: 'redux', isDone: false },
            { id: v1(), title: 'node', isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: 'book', isDone: false },
            { id: v1(), title: 'milk', isDone: true }
        ]
    });

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action);
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action);
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTasksReducer(action);
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatchToTasksReducer(action);
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolistsReducer(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatchToTodolistsReducer(action);
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
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
                        let tasksForTODO = tasksObj[td.id];
                        if (td.filter === 'completed'){
                            tasksForTODO = tasksForTODO.filter(t => t.isDone === true);
                        }
                        if (td.filter === 'active'){
                            tasksForTODO = tasksForTODO.filter(t => t.isDone === false);
                        }
                        return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist title={td.title} 
                                                key={td.id}
                                                id={td.id}
                                                tasks={tasksForTODO}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeTaskStatus={changeTaskStatus}
                                                filter={td.filter}
                                                removeTodolist={removeTodolist}
                                                changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers;
