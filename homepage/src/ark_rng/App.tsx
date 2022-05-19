import React from 'react';
import { Provider } from 'react-redux'
import TeamView from "./TeamView";
import ToolBox from './ToolBox';
import { store } from "./reducers/State";
import AppInitializer from './widgets/AppInitializer';
import "./App.css";

function ArkRngApp() {
    return <Provider store={store}>
        <div className="App">
            <AppInitializer />
            <ToolBox />
            <TeamView />
        </div>
    </Provider>
}

export default ArkRngApp;