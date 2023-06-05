export const formatDateTime = (dateTime: string) => {
  const [year, month, day] = dateTime.split(' ');
  return `${year}.${month}.${day}`;
};
