import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';

type EnterType = 'enter' | 'shiftEnter' | false;

interface ClearConfig extends ButtonProps {}
interface SendConfig extends ButtonProps {}

interface ProInputAreaConfig {
  clearConfig?: ClearConfig;
  sendConfig?: SendConfig;
}

interface Actions {
  send: SendConfig;
  clear: ClearConfig;
  render: () => Array<ReactNode>;
}

interface ProInputAreaProps {
  value?: string;
  loading?: boolean;
  enterType?: EnterType;
  disabled?: boolean;
  onSubmit?: (message: string) => boolean;
  onChange?: (newValue: string, oldValue: string) => void;
  onCancel?: () => void;
  components?: ProInputAreaConfig
  actions?: Actions;
}

export type {
  ProInputAreaProps,
  ProInputAreaConfig,
  EnterType,
  Actions,
  ClearConfig,
  SendConfig,
};
