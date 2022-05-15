import React from "react";
import OpCountEdit from "./widgets/OpCountEdit";

type Props = {

}

type State = {

}

class ToolBox extends React.Component<Props, State> {
    render() {
        return <div>
            <OpCountEdit />
        </div>
    }
}

export default ToolBox