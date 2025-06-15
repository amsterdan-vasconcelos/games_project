export const createObjectError = (message: string, status: number) => {
  return { error: { message, status } };
};
