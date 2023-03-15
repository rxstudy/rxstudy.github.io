
type JsxElementFunction = () => JSX.Element

interface ArticleInfo {
  title: string
  subject: string
  key: string
  EL: JsxElementFunction
  date: string
}

export type { ArticleInfo }
