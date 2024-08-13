import React from 'react';
import { Sender } from '@ant-design/x';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [enterType, setEnterType] = React.useState('enter');

  const ActionsWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
  }) => {
    const EnterDropdown = (
      <Dropdown
        menu={{
          items: [
            {
              key: 'enter',
              label: 'Enter',
              onClick: () => {
                setEnterType('enter');
              },
            },
            {
              key: 'ShiftEnter',
              label: 'ShiftEnter',
              onClick: () => {
                setEnterType('shiftEnter');
              },
            },
          ],
        }}
        placement="bottomLeft"
      >
        <Button>
          {enterType} <DownOutlined />
        </Button>
      </Dropdown>
    );

    return (
      <Space {...props}>
        {EnterDropdown}
        {children}
      </Space>
    );
  };

  return (
    <Sender
      enterType={enterType}
      components={{
        actions: {
          wrapper: ActionsWrapper,
        },
      }}
    />
  );
};

export default App;
