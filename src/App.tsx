import React, { useState } from 'react';
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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let filtTasks = tasks.filter(t => t.id !== id );
        tasksObj[todolistId] = filtTasks;
        setTasks( {...tasksObj} );
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = { id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks( {...tasksObj} );
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        if(todolist) {
            todolist.filter = value;
            setTodolists([ ...todolists ]);
        }
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find( t => t.id === taskId );
        if (task){
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ]);

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(td => td.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks( {...tasksObj} );
    }

    const changeTitleTodolist = (todolistId: string, newTitle: string) => {
        const findedTodolist = todolists.find(td => td.id === todolistId);
        if(findedTodolist) {
            findedTodolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
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

    function addTodoList(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find( t => t.id === taskId );
        if (task){
            task.title = newTitle;
            setTasks({ ...tasksObj });
        }
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

export default App;
