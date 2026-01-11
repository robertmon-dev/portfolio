import { forwardRef, useId } from 'react';
import type { TextAreaProps, TextAreaState } from './types';
import { getTextareaWrapperClasses } from './styles';
import './TextArea.scss';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    label,
    error,
    state = 'default',
    helperText,
    fullWidth = false,
    className = '',
    id,
    disabled,
    rows = 4,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id || generatedId;

  const finalState: TextAreaState = error ? 'error' : state;
  const messageContent = typeof error === 'string' ? error : helperText;

  const wrapperClasses = getTextareaWrapperClasses({
    state: finalState,
    disabled,
    fullWidth
  });

  return (
    <div className={`textarea-container ${fullWidth ? 'full-width' : ''} ${className}`}>

      {label && (
        <label htmlFor={inputId} className="textarea-label">
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={finalState === 'error'}
          rows={rows}
          {...rest}
        />
      </div>

      {messageContent && (
        <span className={`textarea-helper textarea-helper--${finalState}`}>
          {messageContent}
        </span>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';
