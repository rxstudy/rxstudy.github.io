import { OnComponentDidMount } from '../../common/react_helpers';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../reducers/State';
import { initDeckState } from '../reducers/OpDeck';
import { OP_SLOT_COUNT_DEFAULT } from '../Const';

function AppInitializer() {
    const charMap = useSelector((state: IAppState) => state.char_db.map);
    const dispatch = useDispatch()

    // Initialize stores
    OnComponentDidMount(() => {
        dispatch(initDeckState({
            // TODO: Load user preference here.
            allowed_op_count: OP_SLOT_COUNT_DEFAULT,
            available_op_ids: Object.keys(charMap),
            excluded_op_ids: [],
            in_use_op_ids: []
        }));
        console.log("Log[INFO]: Data initialized.")
    })

    // Change App title
    document.title = "明日方舟方舟随机配队"
    return null;
}

export default AppInitializer