import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHadler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode 
        ? <TextField value={title} onChange={onChangeTitleHadler} autoFocus onBlur={activateViewMode} id="standard-basic" label="Editing..." />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})