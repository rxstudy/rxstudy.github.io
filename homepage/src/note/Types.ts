
type JsxElementFunction = () => JSX.Element

interface ArticleInfo {
  title: string
  subject: string
  key: string
  EL: JsxElementFunction
}

export type { ArticleInfo }
