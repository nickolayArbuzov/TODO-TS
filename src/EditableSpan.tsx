import React, { useState, ChangeEvent } from 'react';

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType){
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
        ? <input value={title} onChange={onChangeTitleHadler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}