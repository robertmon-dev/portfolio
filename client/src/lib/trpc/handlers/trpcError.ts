import i18n from '../../../i18n';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'react-toastify';

export const handleTrpcError = (error: unknown): string | null => {
  if (!(error instanceof TRPCClientError)) {
    return i18n.t('errors.codes.NETWORK_ERROR');
  }

  if (error.message === 'unserialize' || error.shape?.message === 'unserialize') {
    return null;
  }

  const code = error.data?.code;
  const serverMessage = error.message;

  if (serverMessage && i18n.exists(serverMessage)) {
    return i18n.t(serverMessage);
  }

  if (code === 'BAD_REQUEST' && error.data?.zodError) {
    return i18n.t('errors.codes.VALIDATION_ERROR');
  }

  if (code === 'UNAUTHORIZED') {
    localStorage.removeItem('token');
    return i18n.t('errors.codes.UNAUTHORIZED');
  }

  const translationKey = `errors.codes.${code}`;
  if (i18n.exists(translationKey)) {
    return i18n.t(translationKey);
  }

  return serverMessage || i18n.t('errors.codes.UNKNOWN_ERROR');
};

export const notifyError = (error: unknown) => {
  const message = handleTrpcError(error);
  if (message) {
    toast.error(message);
  }
};
