export function getErrorMessage(
  error: any,
  defaultMessage: string = '',
): string {
  return error?.cause || error?.message || defaultMessage;
}
