import React from 'react'
import { Button, Result } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

export default function NotFound (): JSX.Element {
  return (
        <Result
            icon={<WarningOutlined />}
            title="404"
            subTitle="Sorry, page not found."
            extra={<Button onClick={() => { window.history.back() }} type="primary">Back</Button>}
        />
  )
}
