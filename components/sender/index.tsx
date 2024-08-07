import { Button, Input, Space } from 'antd';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import classnames from 'classnames';
import { ClearOutlined, SendOutlined } from '@ant-design/icons';

import useStyle from './style';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SenderProps } from './interface';
import useConfigContext from '../config-provider/useConfigContext';
import { useMergedState } from 'rc-util';
import StopLoadingIcon from './StopLoading';

const Sender: React.FC<Readonly<SenderProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    styles,
    className,
    rootClassName,
    style,
    value,
    placeholder,
    onSubmit = () => {},
    loading: outLoading,
    onCancel,
    onChange,
    actions,
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
    onChange: onCancel,
  });

  const send = () => {
    setLoading(true);
    setMessage('');
    onSubmit(message);
  };

  const defaultButtonProps = useMemo(
    () =>
      loading
        ? ({
            type: 'text',
            className: `${prefixCls}-actions-btn`,
            onClick: () => setLoading(false),
            icon: <StopLoadingIcon />,
          } as const)
        : ({
            type: 'text',
            className: `${prefixCls}-actions-btn`,
            onClick: send,
            icon: <SendOutlined />,
          } as const),
    [loading, message],
  );

  const defaultInputTextAreaProps: TextAreaProps = {
    placeholder: placeholder || 'Please enter a message...',
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
    onPressEnter: (e) => {
      if (!loading && !e.shiftKey && !isChineseInput.current) {
        e.preventDefault();
        send();
      }
    },
    ...rest,
  };

  const ActionsList = () => {
    const { clear, send: sendConfig, render } = actions || {};
    const ClearButton = (
      <Button
        icon={<ClearOutlined />}
        type="text"
        className={`${prefixCls}-actions-btn`}
        onClick={() => {
          setMessage('');
        }}
        {...clear}
      />
    );

    const SendButton = <Button {...defaultButtonProps} {...sendConfig} />;

    return (
      <Space className={`${prefixCls}-actions-list`}>
        {render ? render([ClearButton, SendButton]) : [ClearButton, SendButton]}
      </Space>
    );
  };

  return wrapCSSVar(
    <div className={mergedCls} style={style}>
      <Input.TextArea {...defaultInputTextAreaProps} />
      <ActionsList />
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Sender.displayName = 'Sender';
}

export default Sender;
