import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';
import type { TextAreaProps } from 'antd/lib/input/TextArea';

type EnterType = 'enter' | 'shiftEnter' | string |false;

interface ClearConfig extends ButtonProps {}
interface SendConfig extends ButtonProps {}
interface LoadingConfig extends ButtonProps {}

interface SenderConfig {
  clearConfig?: ClearConfig;
  sendConfig?: SendConfig;
  loadingConfig?: LoadingConfig;
}

interface Actions {
  send?: SendConfig;
  clear?: ClearConfig;
  load?: LoadingConfig;
  render?: ([clearButton, lodingButton, sendButton]: Array<ReactNode>) => Array<ReactNode>;
}

type SenderProps = Omit<TextAreaProps, 'onChange'> & {
  prefixCls?: string;
  value?: string;
  loading?: boolean;
  enterType?: EnterType;
  disabled?: boolean;
  onSubmit?: (message: string) => boolean;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  components?: SenderConfig;
  actions?: Actions;
  styles?: {
    input?: React.CSSProperties;
    actions?: React.CSSProperties;
  };
  rootClassName?: string;
  className?: {
    input?: string;
    actions?: string;
  };
  style?: React.CSSProperties;
};

export type { SenderProps, SenderConfig, EnterType, Actions, ClearConfig, SendConfig };
