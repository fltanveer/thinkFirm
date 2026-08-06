import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { ButtonProps } from './Button';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ButtonProps>[];

  return (
    <div className={cx('inline-flex', className)} role="group">
      {items.map((child, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        return cloneElement(child, {
          key: child.key ?? i,
          radiusClassName: isFirst ? 'rounded-l-sg2-sm rounded-r-sg2-none' : isLast ? 'rounded-r-sg2-sm rounded-l-sg2-none' : 'rounded-sg2-none',
          className: cx(child.props.className, !isFirst && '-ml-px'),
        });
      })}
    </div>
  );
}
