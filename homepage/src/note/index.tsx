import React from 'react'
import _ from 'lodash'
import { Link, useParams } from 'react-router-dom'
import { Divider, List, Typography, Breadcrumb, Col } from 'antd'
import NotFound from '../NotFound'
import { getArticleMap } from './ArticleMap'

const subjectToNames: Record<string, string> = {
  cg: 'Graphics Notes',
  stat: 'Statitics Notes'
}

function buildCrumb (subject: string, key: string): JSX.Element {
  return <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item key={'crumb-key-note'}>note</Breadcrumb.Item>
        <Breadcrumb.Item key={`crumb-key-${subject}`}><Link to={`/note/${subject}`}>{subject}</Link></Breadcrumb.Item>
        {key !== ''
          ? <Breadcrumb.Item key={`crumb-key-${key}`}><i>{key}</i></Breadcrumb.Item>
          : null}
    </Breadcrumb>
}

function renderListing (subject: string): JSX.Element {
  const articleMap = getArticleMap()
  const listing = articleMap.getSubjectListing(subject)
  if (listing.length === 0) {
    return <NotFound />
  }
  const links: JSX.Element[] = _.sortBy(listing, (entry) => entry.title).map((entry) => {
    return <Link key={`note-${subject}-${entry.key}`} to={`${entry.key}`}>{entry.title}</Link>
  })

  return (
        <> {buildCrumb(subject, '')}
            <Divider orientation="left"></Divider>
            <Col span={8} push={4}>
                <List
                    header={<h1>{subjectToNames[subject]}</h1>}
                    dataSource={links}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text>-</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </Col>
        </>
  )
}

function renderArticle (subject: string, key: string): JSX.Element {
  const articleMap = getArticleMap()
  const article = articleMap.getArticle(subject, key)
  if (article == null) {
    return <NotFound />
  }
  return <div>
        {buildCrumb(subject, key)}
        <h1>{article.title}</h1>
        {article.EL()}
    </div>
}

export default function Index (): JSX.Element {
  let { subject, key } = useParams()
  subject = subject != null ? subject : ''
  key = key != null ? key : ''
  if (key !== '') {
    return renderArticle(subject, key)
  } else if (subject !== '') {
    return renderListing(subject)
  }
  return <NotFound />
}
