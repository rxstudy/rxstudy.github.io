import React from 'react';
import { Provider } from 'react-redux'
import TeamView from "./TeamView";
import ToolBox from './ToolBox';
import { store } from "./reducers/State";
import DataLoader from './widgets/DataLoader';

function ArkRngApp() {
    return <Provider store={store}>
        <div>
            <DataLoader />
            <ToolBox />
            <TeamView />
        </div>
    </Provider>
}

export default ArkRngApp;