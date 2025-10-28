const date = new Date();

export const getKSTDate = (): Date =>
  new Date(date.getTime() + 9 * 60 * 60 * 1000);
