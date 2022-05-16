import React from "react";
import OpCountEdit from "./widgets/OpCountEdit";
import OpGenPanel from "./widgets/OpGenPanel";
import "./ToolBox.css";

type Props = {

}

type State = {

}

class ToolBox extends React.Component<Props, State> {
    render() {
        return <div className="tool-box-top">
            <OpCountEdit />
            <OpGenPanel />
        </div>
    }
}

export default ToolBox