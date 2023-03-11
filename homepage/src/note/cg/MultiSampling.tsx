import React, { ReactNode } from 'react'
import type { ArticleInfo } from '../Types'

type Props = {}
function MultiSampling({ }: Props): ReactNode {
    return (
        <div>content</div>
    )
}

const INFO: ArticleInfo = {
    title: "Multisampling (MSAA)",
    list_key: "multisampling",
    EL: MultiSampling
}

export default INFO

