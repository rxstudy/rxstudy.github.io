import React, { memo } from 'react'
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import { LinkOutlined, HighlightOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('主页', '', <HomeOutlined />),
    { type: 'divider' },
    getItem('学习笔记', 'note', <HighlightOutlined />, [
        getItem('Statistics', 'stat'),
        getItem('Graphics', 'cg'),
        getItem('Modeling', 'model'),
    ]),
    { type: 'divider' },
    getItem('工具', 'demo', <LinkOutlined />, [
        getItem('方舟随机编队器', 'ark_rng'),
    ]),

    { type: 'divider' },

    getItem('学习资源', 'resource', <SettingOutlined />, [
        getItem('Applications', 'apps'),
        getItem('Courses', 'courses'),
        getItem('Papers', 'papers'),
        getItem('Repos', 'repos'),
    ]),
];


const SideBar = memo((props) => {
    const navigate = useNavigate();
    return <Menu
        onClick={(e) => {
            navigate(`/${e.keyPath.reverse().join("/")}`);
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['']}
        mode="inline"
        items={items}
    />
})


export default SideBar