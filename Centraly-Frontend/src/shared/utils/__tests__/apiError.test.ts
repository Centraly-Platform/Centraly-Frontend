import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { getApiErrorMessage } from '../apiError';

describe('getApiErrorMessage', () => {
  it('uses fallback for unknown errors', () => {
    expect(getApiErrorMessage('x', 'فشل')).toBe('فشل');
  });

  it('reads Error.message', () => {
    expect(getApiErrorMessage(new Error('network'))).toBe('network');
  });

  it('reads axios description', () => {
    const axiosError = new axios.AxiosError('fail');
    axiosError.response = {
      data: { description: 'غير مصرح' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    };

    expect(getApiErrorMessage(axiosError, 'fallback')).toBe('غير مصرح');
  });
});
