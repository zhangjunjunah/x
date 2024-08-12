import React from 'react';
import { Sender } from '@ant-design/x';
import { Button } from 'antd';
import { OpenAIOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const OutLink = <Button type="dashed" icon={<OpenAIOutlined />} />;
  const [loading, setLoading] = React.useState(true);
  return (
    <Sender
      loading={loading}
      onSubmit={(message) => {
        console.log('submit', message);
        setLoading(true);
        return true;
      }}
      onCancel={() => {
        setLoading(false);
      }}
      actions={{
        clear: {
          type: 'default',
        },
        send: {
          style: {
            border: '1px solid #1890ff',
          },
        },
        render: ([clear, load, send]) => {
          if (loading) {
            return [clear, OutLink, load];
          }
          return [clear, send];
        },
      }}
    />
  );
};

export default App;
