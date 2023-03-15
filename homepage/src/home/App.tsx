import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from './SideMenu'

const { Content, Footer, Sider } = Layout

function Home (): JSX.Element {
  return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible >
            <div style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)'
            }} />
            <SideMenu />
        </Sider>
        <Layout className="site-layout">
            {/* <Header style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
        </Layout>
    </Layout>
}

export default Home
