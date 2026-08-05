import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { ButtonProps } from './Button';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

// Visually joins a row of <Button>s: square off the touching edges via
// Button's radiusClassName override (never two conflicting rounded-*
// classes on one element) and collapse the doubled-up borders with -ml-px.
export function ButtonGroup({ children, className }: ButtonGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ButtonProps>[];

  return (
    <div className={cx('inline-flex', className)} role="group">
      {items.map((child, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        return cloneElement(child, {
          key: child.key ?? i,
          radiusClassName: isFirst ? 'rounded-l-xs rounded-r-none' : isLast ? 'rounded-r-xs rounded-l-none' : 'rounded-none',
          className: cx(child.props.className, !isFirst && '-ml-px'),
        });
      })}
    </div>
  );
}
