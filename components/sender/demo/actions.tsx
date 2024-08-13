import React from 'react';
import { Sender } from '@ant-design/x';
import { Button, Spin } from 'antd';
import { DeleteFilled, OpenAIOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const openailink = (
    <Button
      type="dashed"
      onClick={() => {
        setLoading(true);
        setValue('');
      }}
      icon={<OpenAIOutlined />}
    />
  );
  const ClearMessage = (
    <Button
      type="dashed"
      onClick={() => {
        setValue('');
      }}
      icon={<DeleteFilled />}
    />
  );
  const LoadingSpin = (
    <Button
      type="dashed"
      icon={<Spin />}
      onClick={() => {
        setLoading(false);
      }}
    />
  );
  return (
    <Sender
      value={value}
      onChange={setValue}
      loading={loading}
      onSubmit={(message) => {
        console.log('submit', message);
        setLoading(true);
        return true;
      }}
      onCancel={() => {
        setLoading(false);
      }}
      components={{
        actions: {
          send: () => openailink,
          clear: () => ClearMessage,
          loading: () => LoadingSpin,
        },
      }}
    />
  );
};

export default App;
