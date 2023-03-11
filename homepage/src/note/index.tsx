import React from 'react'
import _ from 'lodash'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { Divider, List, Typography, Breadcrumb, Col } from 'antd';
import NotFound from '../NotFound';
import { ReactNode } from 'react';
import type { ArticleInfo } from './Types';
import MultiSamplingInfo from './cg/MultiSampling'

const ARTICLE_MAP: Record<string, ArticleInfo[]> = {
    "cg": [MultiSamplingInfo],
    "stat": [],
    "modeling": [],
}

const CG_DATA: ReactNode[] = [
    <Link to={`${MultiSamplingInfo.list_key}`}>{MultiSamplingInfo.title}</Link>,
];

const STAT_DATA: ReactNode[] = [

];

function buildCrumb(subject: string, key: string | null) {
    return <Breadcrumb style={{ margin: '16px 0', }}>
        <Breadcrumb.Item key={`crumb-key-note`}>note</Breadcrumb.Item>
        <Breadcrumb.Item key={`crumb-key-${subject}`}><Link to={`/note/${subject}`}>{subject}</Link></Breadcrumb.Item>
        {key && key != "" ?
            <Breadcrumb.Item key={`crumb-key-${key}`}><i>{key}</i></Breadcrumb.Item> : null}
    </Breadcrumb>
}

function renderListing(subject: string) {
    let listData = CG_DATA;
    switch (subject) {
        case "cg":
            listData = CG_DATA;
            break;
        case "stat":
            listData = STAT_DATA
            break;
        default:
            return <NotFound />
    }
    return (
        <> {buildCrumb(subject, null)}
            <Divider orientation="left"></Divider>
            <Col span={8} push={4}>
                <List
                    header={<div>Header</div>}
                    dataSource={CG_DATA}
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

function renderArticle(subject: string, key: string) {
    const articles = ARTICLE_MAP[subject];
    console.log(articles);
    if (articles == null) {
        return <NotFound />
    }
    const article = _.find(articles, (info: ArticleInfo) => {
        return info.list_key == key
    });
    console.log(article);
    if (article == null) {
        return <NotFound />
    }
    return <div>
        {buildCrumb(subject, key)}
        <h1>{article.title}</h1>
        {article.EL({})}
    </div>;
}

export default function Index() {
    const { subject, key } = useParams();
    if (key != null) {
        return renderArticle(subject || "", key || "");
    }
    else if (subject != null) {
        return renderListing(subject || "");
    }
    return <NotFound />
}