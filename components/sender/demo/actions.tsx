import React from 'react';
import { Sender } from '@ant-design/x';
import { Button } from 'antd';
import { OpenAIOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const OutLink = <Button type="dashed" icon={<OpenAIOutlined />} />;
  return (
    <Sender
      actions={{
        clear: {
          type: 'default',
        },
        send: {
          style: {
            border: '1px solid #1890ff',
          },
        },
        render: ([clear, send]) => [OutLink, clear, send],
      }}
    />
  );
};

export default App;
