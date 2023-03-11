import React from 'react'
import { Provider } from 'react-redux'
import TeamView from './TeamView'
import ToolBox from './ToolBox'
import { store } from './reducers/State'
import AppInitializer from './widgets/AppInitializer'
import { setClearAndSetBodyClass } from '../common/react_helpers'
import './App.css'
import BannedDeck from './BannedDeck'

function ArkRngApp (): JSX.Element {
  setClearAndSetBodyClass('arknights-tool')
  return <Provider store={store}>
        <div className="App">
            <AppInitializer />
            <ToolBox />
            <BannedDeck />
            <TeamView />
        </div>
    </Provider>
}

export default ArkRngApp
