import { combineReducers, createStore } from 'redux';
import { taskReducer } from './tasksReducer';
import { todoListReducer } from './todoListReducer';

const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
