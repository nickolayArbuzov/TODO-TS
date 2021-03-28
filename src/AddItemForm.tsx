import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('рендер формы');
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    let [focus, setFocus] = useState(false);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== ''){
            setError('');
        }
        if(e.charCode === 13){
            addItem();
        }
    }
    const errorDeleted = () => {
        setFocus(true);
        setError('');
    }
    const addItem = () => {
        if(newTaskTitle.trim() === '') {
            setError('Title is required');
            return;
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle('');
    }
    return  <div>
                { !error 
                ? <TextField autoFocus={focus} value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler} id="standard-basic" label="Entering..." />
                : <TextField error id="standard-error-helper-text" label="Error" defaultValue="" helperText={error} onFocus={errorDeleted}/>
                }
                <IconButton onClick={addItem}><PlaylistAddIcon/></IconButton>
            </div>
})
