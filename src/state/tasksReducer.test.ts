import { taskReducer, 
    removeTaskAC } from './tasksReducer';
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