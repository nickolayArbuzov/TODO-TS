import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'
import React from 'react'

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action('title changed')

export const EditableSpanBaseExample = () => {
    return <>
        <EditableSpan title={'start title'} onChange={changeCallback}/>
    </>
}