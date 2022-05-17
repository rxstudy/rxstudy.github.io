import React from "react";
import OpCountEdit from "./widgets/OpCountEdit";
import OpGenPanel from "./widgets/OpGenPanel";
import "./ToolBox.css";
import PanelViewsMenu from "./widgets/PanelViewsMenu";

type Props = {

}

type State = {

}

class ToolBox extends React.Component<Props, State> {
    render() {
        return <div className="ToolBox-top">
            <OpCountEdit />
            <OpGenPanel />
            <PanelViewsMenu />
            <div className="ToolBox-grad"></div>
        </div>
    }
}

export default ToolBox