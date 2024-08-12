import React from 'react';
import { Sender } from '@ant-design/x';
import { Button, Dropdown } from 'antd';
import { DownOutlined, OpenAIOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const OutLink = <Button type="dashed" icon={<OpenAIOutlined />} />;
  const [loading, setLoading] = React.useState(false);
  const [enterType, setEnterType] = React.useState('enter');
  return (
    <Sender
      enterType={enterType}
      onSubmit={() => {
        setLoading(true);
        return true;
      }}
      onCancel={() => {
        setLoading(false);
      }}
      actions={{
        render: ([clear, load, send]) => {
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
              <Button> {enterType} <DownOutlined /></Button>
            </Dropdown>
          );

          if (loading) {
            return [clear, OutLink, load];
          }
          return [EnterDropdown, clear, send];
        },
      }}
    />
  );
};

export default App;
