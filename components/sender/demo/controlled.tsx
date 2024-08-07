import React, { useState } from 'react';
import { Sender } from '@ant-design/x';

const App: React.FC = () => {
  const [value, setValue] = useState<string>('Hello？this is antd！');
  return (
    <Sender
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};

export default App;
