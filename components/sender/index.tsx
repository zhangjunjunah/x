import React from 'react';

export interface SenderProps {
  rootClassName?: string;
}

const Sender = React.forwardRef<HTMLElement, SenderProps>(
  ({ rootClassName }: SenderProps) => (
    <div className={rootClassName}>2333</div>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  Sender.displayName = 'Sender';
}

export default Sender;
