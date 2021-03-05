import { taskReducer, 
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC } from './tasksReducer';

import { addTodolistAC, removeTodolistAC } from './todoListReducer';
import { v1 } from 'uuid';
import { TaskStateType, FilterValuesType } from '../App';

const startState: TaskStateType = {
    'todolistId1': [
        { id: '1', title: 'css', isDone: true },
        { id: '2', title: 'html', isDone: true },
        { id: '3', title: 'react', isDone: true },
    ],
    'todolistId2': [
        { id: '1', title: 'book', isDone: false },
        { id: '2', title: 'milk', isDone: true },
        { id: '3', title: 'tea', isDone: true }
    ]
}

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
})
test('correct task should be added from correct array', () => {

    const action = addTaskAC('juice', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);
})
test('correct task should be changed status from correct array', () => {

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
})
test('correct task should be changed title from correct array', () => {

    const action = changeTaskTitleAC('2', 'milky', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('html');
    expect(endState['todolistId2'][1].title).toBe('milky');
})
test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC('title')

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})
test('property with todolist should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState['todolistId2']).not.toBeUndefined()
})