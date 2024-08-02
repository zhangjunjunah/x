import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

type EnterType = 'enter' | 'shiftEnter' | false;

interface ClearConfig extends ButtonProps {}
interface SendConfig extends ButtonProps {}

interface SenderConfig {
  clearConfig?: ClearConfig;
  sendConfig?: SendConfig;
}

interface Actions {
  send: SendConfig;
  clear: ClearConfig;
  render: () => Array<ReactNode>;
}

interface SenderProps {
  value?: string;
  loading?: boolean;
  enterType?: EnterType;
  disabled?: boolean;
  onSubmit?: (message: string) => boolean;
  onChange?: (newValue: string, oldValue: string) => void;
  onCancel?: () => void;
  components?: SenderConfig
  actions?: Actions;
}

export type {
  SenderProps,
  SenderConfig,
  EnterType,
  Actions,
  ClearConfig,
  SendConfig,
};
