import { ReactNode } from "react"
import _ from "lodash"

interface ArticleMapInterface {
    register(articleId: string, articleNode: ReactNode, articleInfo: ArticleInfo): void,
    getKeys(): string[],
    getEntry(key: string): ArticleMapEntry
}

type ArticleInfo = {
    displayName: string
}

type ArticleMapEntry = {
    info: ArticleInfo, node: ReactNode
}

type ArticleMapping = Record<string, ArticleMapEntry>

class ArticleMap implements ArticleMapInterface {
    articleMapping: ArticleMapping

    constructor(initialMap: ArticleMapping) {
        this.articleMapping = initialMap
    }

    register(articleId: string, articleNode: ReactNode, articleInfo: ArticleInfo) {
        this.articleMapping[articleId] = {
            info: articleInfo,
            node: articleNode
        };
    }

    getKeys() {
        return _.keys(this.articleMapping);
    }

    getEntry(key: string) {
        return this.articleMapping[key]
    }
}

var articleMap: ArticleMap;

export function getArticleMap() {
    if (articleMap == null) {
        articleMap = new ArticleMap({});
    }
    return articleMap;
}
