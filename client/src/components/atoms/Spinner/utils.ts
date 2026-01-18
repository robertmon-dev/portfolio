import type { ComponentType } from 'react';
import type { SpinnerVariant, SpinnerCommonProps } from './types';
import { DEFAULT_COLOR, DEFAULT_SIZES, SPINNER_COMPONENTS } from './consts';
import { bem } from '../../utility/bem';
import colors from './Spinner.module.scss';

const resolveColor = (inputColor?: string): string => {
  if (!inputColor) return DEFAULT_COLOR;
  if (inputColor in colors) {
    return colors[inputColor as keyof typeof colors];
  }
  return inputColor;
};


export const getSpinnerConfig = (
  variant: SpinnerVariant,
  size?: number,
  color?: string,
  className?: string
) => {
  const SelectedComponent = SPINNER_COMPONENTS[variant];
  const finalColor = resolveColor(color);
  const finalSize = size || DEFAULT_SIZES[variant];

  const wrapperClasses = bem('spinner-wrapper', [variant], className);

  const componentProps: SpinnerCommonProps = {
    color: finalColor,
  };

  if (variant === 'bar') {
    componentProps.width = finalSize;
  } else {
    componentProps.size = finalSize;
  }

  if (variant === 'dots' || variant === 'beat') {
    componentProps.margin = 4;
  }

  return {
    Component: SelectedComponent as ComponentType<SpinnerCommonProps>,
    props: componentProps,
    wrapperClasses,
  };
};
