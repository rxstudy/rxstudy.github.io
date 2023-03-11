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
    getItem('学习笔记', 'sub1', <HighlightOutlined />, [
        getItem('Statistics', 'g1'),
        getItem('Graphics', 'g2'),
    ]),

    { type: 'divider' },
    getItem('工具', 'demo', <LinkOutlined />, [
        getItem('方舟随机编队器', 'ark_rng'),
        getItem('Option 6', '6'),
    ]),

    { type: 'divider' },

    getItem('学习资源', 'sub4', <SettingOutlined />, [
        getItem('Applications', '9'),
        getItem('Courses', '10'),
        getItem('Papers', '11'),
        getItem('Repos', '12'),
    ]),
];


const SideBar = memo((props) => {
    const navigate = useNavigate();
    return <Menu
        onClick={(e) => {
            navigate(e.keyPath.reverse().join("/"));
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['']}
        mode="inline"
        items={items}
    />
})


export default SideBar