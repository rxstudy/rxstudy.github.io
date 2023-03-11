import React from "react"
import { getArticleMap } from "../ArticleMap";


function App() {
    return (
        <div className="App">
            Game Camera
        </div>
    );
}

getArticleMap().register("game_camera", <App />, { displayName: "Game Cameras" })

export default App;


