import type { ArticleInfo } from './Types'

interface ArticleMapInterface {
  register: (articleInfo: ArticleInfo) => void
  getArticle: (subject: string, key: string) => ArticleInfo | null
  getSubjectListing: (subject: string) => ArticleInfo[]
}

type ArticleMapping = Record<string, ArticleInfo[]>

class ArticleMap implements ArticleMapInterface {
  map: ArticleMapping

  constructor (initialMap: ArticleMapping = {}) {
    this.map = initialMap
  }

  register (articleInfo: ArticleInfo): void {
    if (!(articleInfo.subject in this.map)) {
      this.map[articleInfo.subject] = []
    }
    this.map[articleInfo.subject].push(articleInfo)
  }

  getSubjectListing (subject: string): ArticleInfo[] {
    if (subject in this.map) {
      return this.map[subject]
    }
    return []
  }

  getArticle (subject: string, key: string): ArticleInfo | null {
    const listing = this.getSubjectListing(subject)
    return listing.filter(articleInfo => articleInfo.key === key)[0]
  }
}

let articleMap: ArticleMap

export function getArticleMap (): ArticleMap {
  if (articleMap == null) {
    articleMap = new ArticleMap({})
  }
  return articleMap
}
