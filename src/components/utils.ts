export const date = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.getSeconds();
};
