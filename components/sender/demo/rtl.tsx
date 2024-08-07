import React from 'react';
import { Sender } from '@ant-design/x';
import { ConfigProvider } from 'antd';

const App: React.FC = () => (
    <ConfigProvider direction="rtl">
      <Sender />
    </ConfigProvider>
  );

export default App;
