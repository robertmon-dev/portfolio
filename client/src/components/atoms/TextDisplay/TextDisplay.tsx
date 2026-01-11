import { useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import type { TextDisplayProps } from './types';
import { getTextDisplayWrapperClasses } from './styles';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import './TextDisplay.scss';

export const TextDisplay = (props: TextDisplayProps) => {
  const {
    label,
    children,
    state = 'default',
    copyable = true,
    maxHeight,
    fullWidth = false,
    helperText,
    className = '',
    ...rest
  } = props;

  const contentRef = useRef<HTMLPreElement>(null);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const wrapperClasses = getTextDisplayWrapperClasses({ state, fullWidth });

  const handleCopyClick = () => {
    if (!contentRef.current) return;
    copyToClipboard(contentRef.current.innerText);
  };

  return (
    <div className={`text-display-container ${fullWidth ? 'full-width' : ''} ${className}`} {...rest}>

      {label && (
        <span className="text-display-label">
          {label}
        </span>
      )}

      <div className={wrapperClasses}>
        {copyable && (
          <button
            className={`text-display-copy ${isCopied ? 'text-display-copy--success' : ''}`}
            onClick={handleCopyClick}
            title="Kopiuj treść"
            type="button"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}

        <pre
          ref={contentRef}
          className="text-display-content"
          style={{ maxHeight: maxHeight }}
        >
          <code>{children}</code>
        </pre>
      </div>

      {helperText && (
        <span className={`text-display-helper text-display-helper--${state}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};
