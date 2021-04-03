import { AppWithRedux } from './AppWithRedux'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const callback = action('callback')

export const AppWithReduxBaseExample = () => {
    return <>
        <AppWithRedux />
    </>
}
