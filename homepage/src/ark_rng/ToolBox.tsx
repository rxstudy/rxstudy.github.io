import React from "react";
import OpCountEdit from "./widgets/OpCountEdit";
import OpGenPanel from "./widgets/OpGenPanel";

type Props = {

}

type State = {

}

class ToolBox extends React.Component<Props, State> {
    render() {
        return <div>
            <OpCountEdit />
            <OpGenPanel />
        </div>
    }
}

export default ToolBox