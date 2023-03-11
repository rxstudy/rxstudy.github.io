import React from "react"
import { useParams } from "react-router-dom"
import { getArticleMap } from "./ArticleMap";
import { Link } from "react-router-dom";

interface ArticleProps {
}

function StudyApp(props: ArticleProps) {
    const articleMap = getArticleMap();
    const keys = articleMap.getKeys();
    console.log(keys);
    const articles = keys.map(key => {
        const articleEntry = articleMap.getEntry(key);
        return <Link to={key}>{articleEntry.info.displayName}</Link>
    })
    return (
        <div className="App">
            {articles}
        </div>
    );
}

export default StudyApp;
