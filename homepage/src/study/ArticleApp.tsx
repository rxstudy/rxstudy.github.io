import React from "react"
import { useParams } from "react-router-dom"
import { getArticleMap } from "./ArticleMap";
import "./game_camera/App"

interface ArticleProps {
}

function Article(props: ArticleProps) {
    console.log(useParams());
    const id = useParams().id || ""
    const article = getArticleMap().getEntry(id);
    return <div>{article.node}</div>;
}

export default Article;
