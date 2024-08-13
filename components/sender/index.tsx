import { Button, Input, Space } from 'antd';
import type { ButtonProps } from 'antd';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import classnames from 'classnames';
import { ClearOutlined, SendOutlined } from '@ant-design/icons';

import useStyle from './style';
import React, { useRef } from 'react';
import type { GetComponent, SenderProps } from './interface';
import useConfigContext from '../config-provider/useConfigContext';
import { useMergedState } from 'rc-util';
import getValue from 'rc-util/lib/utils/get';
import StopLoadingIcon from './StopLoading';

const Sender: React.FC<Readonly<SenderProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    styles,
    className,
    rootClassName,
    style,
    value,
    enterType = 'enter',
    onSubmit,
    loading: outLoading,
    components,
    onCancel,
    onChange: outOnChange,
    ...rest
  } = props;
  const { direction, getPrefixCls } = useConfigContext();
  const prefixCls = getPrefixCls('sender', customizePrefixCls);
  const isChineseInput = useRef(false);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const mergedCls = classnames(className, rootClassName, prefixCls, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });
  const [message, setMessage] = useMergedState('', {
    value,
    onChange: (val) => {
      if (isChineseInput! && outOnChange) {
        outOnChange(val);
      }
    },
  });

  const [loading, setLoading] = useMergedState<boolean>(false, {
    value: outLoading,
    onChange: (flag) => {
      if (!flag && onCancel) {
        onCancel();
      }
    },
  });

  const send = () => {
    setLoading(true);
    if (onSubmit) {
      onSubmit(message);
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (loading || isChineseInput.current) {
      return;
    }

    // 根据 enterType 判断是否触发 send
    switch (enterType) {
      case 'enter':
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          send();
        }
        break;
      case 'shiftEnter':
        if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault();
          send();
        }
        break;
      case false:
        break;
      default:
        break;
    }
  };

  const defaultInputTextAreaProps: TextAreaProps = {
    style: styles?.input,
    className: classnames(`${prefixCls}-inputarea`, className?.input),
    autoSize: { maxRows: 8 },
    value: message,
    onChange: (e) => {
      setMessage(e.target.value);
    },
    onCompositionStart: () => {
      isChineseInput.current = true;
    },
    onCompositionEnd: (e) => {
      isChineseInput.current = false;
      setMessage((e.target as EventTarget & HTMLTextAreaElement)?.value);
    },
    onPressEnter: handleKeyPress,
    ...rest,
  };

  const getComponent = React.useCallback<GetComponent>(
    (path, defaultComponent) => getValue(components, path) || defaultComponent,
    [components],
  );

  const ActionsConfig = (config: ButtonProps) => ({
    type: 'text',
    className: `${prefixCls}-actions-btn`,
    ...config,
  });

  const SendConfig = ActionsConfig({
    onClick: send,
    icon: <SendOutlined />,
  });

  const ClearConfig = ActionsConfig({
    onClick: () => {
      setMessage('');
    },
    icon: <ClearOutlined />,
  });

  const LoadingConfig = ActionsConfig({
    onClick: () => {
      setLoading(false);
    },
    icon: <StopLoadingIcon />,
  });

  const ActionsList = () => {
    const ActionsWapper = getComponent(['actions', 'wrapper'], Space);
    const SenderButtonComponent = getComponent(['actions', 'send'], Button);
    const ClearButtonComponent = getComponent(['actions', 'clear'], Button);
    const LoadingButtonComponent = getComponent(['actions', 'loading'], Button);

    return (
      <ActionsWapper className={`${prefixCls}-actions-list`}>
        <ClearButtonComponent {...ClearConfig} />
        {loading ? (
          <LoadingButtonComponent {...LoadingConfig} />
        ) : (
          <SenderButtonComponent {...SendConfig} />
        )}
      </ActionsWapper>
    );
  };

  const InputTextArea = getComponent(['input'], Input.TextArea);

  return wrapCSSVar(
    <div className={mergedCls} style={style}>
      <InputTextArea {...defaultInputTextAreaProps} />
      <ActionsList />
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Sender.displayName = 'Sender';
}

export default Sender;
