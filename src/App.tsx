import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
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

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(td => {
                    let tasksForTODO = tasksObj[td.id];
                    if (td.filter === 'completed'){
                        tasksForTODO = tasksForTODO.filter(t => t.isDone === true);
                    }
                    if (td.filter === 'active'){
                        tasksForTODO = tasksForTODO.filter(t => t.isDone === false);
                    }
                    return <Todolist title={td.title} 
                                    key={td.id}
                                    id={td.id}
                                    tasks={tasksForTODO}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={td.filter}
                                    removeTodolist={removeTodolist}
                        />
                })
            }
        </div>
    );
}

export default App;
