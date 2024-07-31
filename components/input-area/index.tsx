import React from 'react';

export interface InputAreaProps {
  rootClassName?: string;
}

const InputArea = React.forwardRef<HTMLElement, InputAreaProps>(
  ({ rootClassName }: InputAreaProps) => (
    <div className={rootClassName}>2333</div>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  InputArea.displayName = 'InputArea';
}

export default InputArea;
