type EnterType = 'enter' | 'shiftEnter' | string | false;

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;

export type CustomizeComponent = Component<any>;
interface SenderComponents {
  actions: {
    wrapper?: CustomizeComponent;
    clear?: CustomizeComponent;
    send?: CustomizeComponent;
    loading?: CustomizeComponent;
  };
  input?: CustomizeComponent;
}

type SenderProps = {
  prefixCls?: string;
  value?: string;
  loading?: boolean;
  enterType?: EnterType;
  disabled?: boolean;
  onSubmit?: (message: string) => boolean;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  components?: SenderComponents;
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

export type GetComponent = (
  path: readonly string[],
  defaultComponent?: CustomizeComponent,
) => CustomizeComponent;

export type { SenderProps, EnterType };
