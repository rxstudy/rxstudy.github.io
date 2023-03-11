import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import Paths, { getArticleUrlPattern } from '../Paths';
import { Breadcrumb, Layout, Menu, theme, Anchor } from 'antd';
import SideMenu from "./SideMenu";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function buildCrumb(path: string) {
    return <Breadcrumb style={{ margin: '16px 0', }}>
        {path.split("/").map(segment => {
            return <Breadcrumb.Item key={`crumb-key-{segment}`}>{segment}</Breadcrumb.Item>
        })}
    </Breadcrumb>
}

function Home() {
    let location = useLocation();
    return <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible >
            <div style={{
                height: 32,
                margin: 16,
                background: 'rgba(255, 255, 255, 0.2)',
            }} />
            <SideMenu />
        </Sider>
        <Layout className="site-layout">
            <Header style={{ padding: 0, }} />
            <Content style={{ margin: '0 16px', }}>
                {buildCrumb(location.pathname)}
                <Routes>
                    <Route path={Paths.STUDY} element={<div></div>} />
                    <Route path={getArticleUrlPattern()} element={<div></div>} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: 'center', }}>
            </Footer>
        </Layout>
    </Layout>
}

export default Home;