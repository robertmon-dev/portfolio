export const silence = async <T>(
  promise: Promise<T>,
  fallback: T,
): Promise<T> => {
  try {
    return await promise;
  } catch {
    return fallback;
  }
};

export function tryTo<T, E = Error>(
  promise: Promise<T>,
): Promise<[E | null, T | null]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[E, null]>((err: E) => [err, null]);
}
