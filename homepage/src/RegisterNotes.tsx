import MutileSamplingINFO from './note/cg/MultiSampling'
import { getArticleMap } from './note/ArticleMap'

function RegisterNotes (): void {
  const map = getArticleMap()
  map.register(MutileSamplingINFO)
}

export default RegisterNotes
