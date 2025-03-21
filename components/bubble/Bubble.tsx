import classnames from 'classnames';
import React from 'react';

import { Avatar } from 'antd';
import useXComponentConfig from '../_util/hooks/use-x-component-config';
import { useXProviderContext } from '../x-provider';
import useTypedEffect from './hooks/useTypedEffect';
import useTypingConfig from './hooks/useTypingConfig';
import type { BubbleContentType, BubbleProps } from './interface';
import Loading from './loading';
import useStyle from './style';

export interface BubbleRef {
  nativeElement: HTMLElement;
}

export interface BubbleContextProps {
  onUpdate?: VoidFunction;
}

export const BubbleContext = React.createContext<BubbleContextProps>({});

const Bubble: React.ForwardRefRenderFunction<BubbleRef, BubbleProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    classNames = {},
    styles = {},
    avatar,
    placement = 'start',
    loading = false,
    loadingRender,
    typing,
    content = '',
    messageRender,
    variant = 'filled',
    shape,
    onTypingComplete,
    header,
    footer,
    ...otherHtmlProps
  } = props;

  const { onUpdate } = React.useContext(BubbleContext);

  // ============================= Refs =============================
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: divRef.current!,
  }));

  // ============================ Prefix ============================
  const { direction, getPrefixCls } = useXProviderContext();

  const prefixCls = getPrefixCls('bubble', customizePrefixCls);

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('bubble');

  // ============================ Typing ============================
  const [typingEnabled, typingStep, typingInterval, customSuffix] = useTypingConfig(typing);

  const [typedContent, isTyping] = useTypedEffect(
    content,
    typingEnabled,
    typingStep,
    typingInterval,
  );

  React.useEffect(() => {
    onUpdate?.();
  }, [typedContent]);

  const triggerTypingCompleteRef = React.useRef(false);
  React.useEffect(() => {
    if (!isTyping && !loading) {
      // StrictMode will trigger this twice,
      // So we need a flag to avoid that
      if (!triggerTypingCompleteRef.current) {
        triggerTypingCompleteRef.current = true;
        onTypingComplete?.();
      }
    } else {
      triggerTypingCompleteRef.current = false;
    }
  }, [isTyping, loading]);

  // ============================ Styles ============================
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedCls = classnames(
    prefixCls,
    rootClassName,
    contextConfig.className,
    className,
    hashId,
    cssVarCls,
    `${prefixCls}-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-typing`]: isTyping && !loading && !messageRender && !customSuffix,
    },
  );

  // ============================ Avatar ============================
  const avatarNode = React.isValidElement(avatar) ? avatar : <Avatar {...avatar} />;

  // =========================== Content ============================
  const mergedContent = messageRender ? messageRender(typedContent as any) : typedContent;

  // ============================ Render ============================
  let contentNode: React.ReactNode;
  if (loading) {
    contentNode = loadingRender ? loadingRender() : <Loading prefixCls={prefixCls} />;
  } else {
    contentNode = (
      <>
        {mergedContent as React.ReactNode}
        {isTyping && customSuffix}
      </>
    );
  }

  let fullContent: React.ReactNode = (
    <div
      style={{
        ...contextConfig.styles.content,
        ...styles.content,
      }}
      className={classnames(
        `${prefixCls}-content`,
        `${prefixCls}-content-${variant}`,
        shape && `${prefixCls}-content-${shape}`,
        contextConfig.classNames.content,
        classNames.content,
      )}
    >
      {contentNode}
    </div>
  );

  // 渲染 footer
  // let footerNode: React.ReactNode;
  // if (typeof footer === 'function') {
  //   footerNode = footer({ content: typedContent as any });
  // } else {
  //   footerNode = footer;
  // }
  // if (header || footerNode) {
  if (header || footer) {
    fullContent = (
      <div className={`${prefixCls}-content-wrapper`}>
        {header && (
          <div
            className={classnames(
              `${prefixCls}-header`,
              contextConfig.classNames.header,
              classNames.header,
            )}
            style={{
              ...contextConfig.styles.header,
              ...styles.header,
            }}
          >
            {header}
          </div>
        )}
        {fullContent}
        {/* {footerNode && ( */}
        {footer && (
          <div
            className={classnames(
              `${prefixCls}-footer`,
              contextConfig.classNames.footer,
              classNames.footer,
            )}
            style={{
              ...contextConfig.styles.footer,
              ...styles.footer,
            }}
          >
            {/* {footerNode} */}
            {typeof footer === 'function' ? footer(mergedContent as string) : footer}
          </div>
        )}
      </div>
    );
  }

  return wrapCSSVar(
    <div
      style={{
        ...contextConfig.style,
        ...style,
      }}
      className={mergedCls}
      {...otherHtmlProps}
      ref={divRef}
    >
      {/* Avatar */}
      {avatar && (
        <div
          style={{
            ...contextConfig.styles.avatar,
            ...styles.avatar,
          }}
          className={classnames(
            `${prefixCls}-avatar`,
            contextConfig.classNames.avatar,
            classNames.avatar,
          )}
        >
          {avatarNode}
        </div>
      )}

      {/* Content */}
      {fullContent}
    </div>,
  );
};

type ForwardBubbleType = <T extends BubbleContentType = string>(
  props: BubbleProps<T> & { ref?: React.Ref<BubbleRef> },
) => React.ReactElement;

const ForwardBubble = React.forwardRef(Bubble);

if (process.env.NODE_ENV !== 'production') {
  ForwardBubble.displayName = 'Bubble';
}

export default ForwardBubble as ForwardBubbleType;
