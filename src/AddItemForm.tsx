import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if(e.charCode === 13){
            addTask();
        }
    }
    const addTask = () => {
        if(newTaskTitle.trim() === '') {
            setError('Title is required');
            return;
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle('');
    }
    return  <div>
                <input value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
}
