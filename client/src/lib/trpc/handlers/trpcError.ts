import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'react-toastify';

export const handleTrpcError = (error: unknown): string | null => {
  const { t } = useTranslation();

  if (!(error instanceof TRPCClientError)) {
    return t('errors.codes.NETWORK_ERROR');
  }

  if (error.message === 'unserialize' || error.shape?.message === 'unserialize') {
    return null;
  }

  const code = error.data?.code;
  const serverMessage = error.message;

  if (serverMessage && i18n.exists(serverMessage)) {
    return t(serverMessage);
  }

  if (code === 'BAD_REQUEST' && error.data?.zodError) {
    return t('errors.codes.VALIDATION_ERROR');
  }

  if (code === 'UNAUTHORIZED') {
    localStorage.removeItem('token');
    return t('errors.codes.UNAUTHORIZED');
  }

  const translationKey = `errors.codes.${code}`;
  if (i18n.exists(translationKey)) {
    return t(translationKey);
  }

  return serverMessage || t('errors.codes.UNKNOWN_ERROR');
};

export const notifyError = (error: unknown) => {
  const message = handleTrpcError(error);
  if (message) {
    toast.error(message);
  }
};
