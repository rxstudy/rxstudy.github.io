import React from 'react'
import { Button, Result } from 'antd';
import { WarningOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    return (
        <Result
            icon={<WarningOutlined />}
            title="404"
            subTitle="Sorry, page not found."
            extra={<Button onClick={() => window.history.back()} type="primary">Back</Button>}
        />
    )
}
