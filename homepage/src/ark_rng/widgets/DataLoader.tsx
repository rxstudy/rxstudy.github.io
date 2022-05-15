import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../reducers/State';
import { loadData } from '../reducers/CharDB';

type Props = {

}
type State = {

}

class DataLoader extends React.Component<Props, State> {
    async fetchCharTableJSON() {
        // const resp = await axios.get("");
        // if (resp.status == 200) {
        //     // const dispatch = useDispatch();
        //     // dispatch(loadData({ payload: resp.data }));
        // }
    }
    componentDidMount() {
        this.fetchCharTableJSON();

    }
    render() {
        return null;
    }
}

export default DataLoader