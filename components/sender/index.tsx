import { Button, Input, Space } from 'antd';
import type { ButtonProps } from 'antd';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import classnames from 'classnames';
import { ClearOutlined, SendOutlined } from '@ant-design/icons';

import useStyle from './style';
import React, { useEffect, useRef, useState } from 'react';
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
    onChange,
    ...rest
  } = props;
  const { direction, getPrefixCls } = useConfigContext();
  const isChineseInput = useRef(false);
  const prefixCls = getPrefixCls('sender', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const mergedCls = classnames(className, rootClassName, prefixCls, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });
  const [message, setMessage] = useState('');

  // support chinese input
  useEffect(() => {
    if (!isChineseInput.current && onChange) {
      onChange(message);
    }
  }, [message]);
  useEffect(() => {
    if (value) {
      setMessage(value);
    }
  }, [value]);

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

  const buttonDefaultConfig: ButtonProps = {
    type: 'text',
    className: `${prefixCls}-actions-btn`,
  };
  const SenderButton = () => (
    <Button onClick={send} icon={<SendOutlined />} {...buttonDefaultConfig} />
  );
  const ClearButton = () => (
    <Button
      icon={<ClearOutlined />}
      {...buttonDefaultConfig}
      onClick={() => {
        setMessage('');
      }}
    />
  );

  const LoadingButton = () => (
    <Button onClick={() => setLoading(false)} icon={<StopLoadingIcon />} {...buttonDefaultConfig} />
  );
  const ActionsList = () => {
    const ActionsWapper = getComponent(['actions', 'wrapper'], Space);
    const SenderButtonComponent = getComponent(['actions', 'send'], SenderButton);
    const ClearButtonComponent = getComponent(['actions', 'clear'], ClearButton);
    const LoadingButtonComponent = getComponent(['actions', 'loading'], LoadingButton);

    return (
      <ActionsWapper className={`${prefixCls}-actions-list`}>
        <ClearButtonComponent />
        {loading ? <LoadingButtonComponent /> : <SenderButtonComponent />}
      </ActionsWapper>
    );
  };

  const InputTextArea = getComponent(['input'], ()=><Input.TextArea {...defaultInputTextAreaProps}/>);

  return wrapCSSVar(
    <div className={mergedCls} style={style}>
      <InputTextArea/>
      <ActionsList />
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Sender.displayName = 'Sender';
}

export default Sender;
