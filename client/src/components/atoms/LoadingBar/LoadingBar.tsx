import { forwardRef } from 'react';
import type { LoadingBarProps } from './types';
import { getLoadingBarClasses } from './styles';
import { useLoadingBar } from './useLoadingBar';
import './LoadingBar.scss';

export const LoadingBar = forwardRef<HTMLDivElement, LoadingBarProps>((props, ref) => {
  const {
    variant, fullWidth, size, padding, isLoading,
    progressStart, progressStep, onStart, onFinish,
    ...rest
  } = props;

  const { progress, isVisible } = useLoadingBar({
    isLoading,
    progressStart,
    progressStep,
    onStart,
    onFinish
  });

  const classes = getLoadingBarClasses({ variant, size, fullWidth, isLoading, padding, ...rest });

  const barStyle = {
    width: `${progress}%`,
    transition:
      progress === 0 ? 'none' :
        progress === 100 ? 'width 0.2s ease-out' :
          'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',

    opacity: isVisible ? 1 : 0,
    transitionProperty: 'width, opacity',
    transitionDuration: progress === 100 ? '0.2s, 0.5s' : '0.5s, 0.3s'
  };

  return (
    <div ref={ref} className={classes} {...rest}>
      <div
        className="loading-bar__inner"
        style={barStyle}
      />
    </div>
  );
});

LoadingBar.displayName = 'LoadingBar';
