import React from 'react';

import Bubble from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';

describe('bubble', () => {
  mountTest(() => <Bubble content="test" />);
  rtlTest(() => <Bubble content="test" />);
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Bubble component work', () => {
    const { container } = render(<Bubble content="test" />);
    const element = container.querySelector<HTMLDivElement>('.ant-bubble');
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot();
  });

  it('Bubble support content', () => {
    const { container } = render(<Bubble content="hello world" />);
    const element = container.querySelector<HTMLDivElement>('.ant-bubble .ant-bubble-content');
    expect(element?.textContent).toBe('hello world');
  });

  it('Bubble support messageRender', () => {
    const { container } = render(
      <Bubble
        content="test-messageRender"
        messageRender={(content) => <span className="test-messageRender">{content}</span>}
      />,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-bubble .test-messageRender');
    expect(element).toBeTruthy();
    expect(element?.textContent).toBe('test-messageRender');
  });

  // 测试 footer 属性为静态内容时的渲染
  it('should render static footer', () => {
    const { container } = render(<Bubble content="Test content" footer={'Test footer'} />);
    const element = container.querySelector<HTMLSpanElement>('.ant-bubble .ant-bubble-footer');
    expect(element).toBeTruthy();
    expect(element?.textContent).toBe('Test footer');
  });

  // 测试 footer 属性为函数时的渲染
  it('should render footer with function and get content', () => {
    const content = 'Test content';
    const footerFunction = (content: string) => (
      <div className="test-footer">{`Footer for: ${content}`}</div>
    );
    const { container } = render(<Bubble content={content} footer={footerFunction} />);
    const element = container.querySelector<HTMLSpanElement>(
      '.ant-bubble .ant-bubble-footer .test-footer',
    );
    expect(element).toBeTruthy();
    expect(element?.textContent).toBe('Footer for: Test content');
  });

  it('Bubble support typing', () => {
    const { container } = render(<Bubble typing content="test" />);
    expect(container.querySelector<HTMLDivElement>('.ant-bubble')).toHaveClass('ant-bubble-typing');
  });

  it('Bubble support avatar', () => {
    const { container } = render(
      <Bubble avatar={<span className="test-avatar">avatar</span>} content="" />,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-bubble .test-avatar')).toBeTruthy();
  });

  it('Bubble support loading', () => {
    const { container } = render(<Bubble content="" loading />);
    const selectors = '.ant-bubble .ant-bubble-content .ant-bubble-dot';
    expect(container.querySelector<HTMLSpanElement>(selectors)).toBeTruthy();
  });

  it('Bubble support placement', () => {
    const { container, rerender } = render(<Bubble placement="start" content="" />);
    const element = container.querySelector<HTMLDivElement>('.ant-bubble');
    expect(element).toHaveClass('ant-bubble-start');
    rerender(<Bubble placement="end" content="" />);
    expect(element).toHaveClass('ant-bubble-end');
  });

  it('Bubble support typing effect', async () => {
    const { container, rerender } = render(<Bubble typing content="你好你好你好" />);
    const element = container.querySelector<HTMLDivElement>('.ant-bubble .ant-bubble-content');

    expect(element?.textContent).toBe('你');
    await waitFakeTimer();
    expect(element?.textContent).toBe('你好你好你好');

    // Continue typing
    rerender(<Bubble typing content="你好你好你好?!" />);
    expect(element?.textContent).toBe('你好你好你好');

    await waitFakeTimer();
    expect(element?.textContent).toBe('你好你好你好?!');
  });

  it('Bubble Should support className & classNames & style & styles', () => {
    const { container } = render(
      <Bubble
        content="hello"
        avatar={<span>avatar</span>}
        className="test-className"
        classNames={{ avatar: 'test-avatar', content: 'test-content' }}
        style={{ backgroundColor: 'green' }}
        styles={{ avatar: { color: 'red' }, content: { color: 'blue' } }}
      />,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-bubble');
    const avatarElement = element?.querySelector<HTMLDivElement>('.ant-bubble-avatar');
    const contentElement = element?.querySelector<HTMLDivElement>('.ant-bubble-content');
    expect(element).toHaveClass('test-className');
    expect(avatarElement).toHaveClass('test-avatar');
    expect(contentElement).toHaveClass('test-content');
    expect(element).toHaveStyle({ backgroundColor: 'green' });
    expect(avatarElement).toHaveStyle({ color: 'red' });
    expect(contentElement).toHaveStyle({ color: 'blue' });
  });

  it('reset content if changed', async () => {
    const { container, rerender } = render(<Bubble content="little" typing />);
    await waitFakeTimer();

    rerender(<Bubble content="bamboo" typing />);
    expect(container.querySelector<HTMLDivElement>('.ant-bubble-content')!.textContent).toEqual(
      'b',
    );
  });
});
