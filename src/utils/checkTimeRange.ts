const formattedTimestamps = (timestamps: string[]) =>
  timestamps.map((timestamp) => {
    const parts = timestamp.split(' ');
    const date = parts.slice(0, 3).join('-');
    const time = parts.slice(3).join(':');
    return `${date}T${time}`;
  });

export function checkTimeRange(period: string[]): boolean {
  const temp = formattedTimestamps(period);

  const currentTime = new Date();
  const startTime = new Date(temp[0]);
  const endTime = new Date(temp[1]);

  return currentTime >= startTime && currentTime <= endTime;

  // 시간 범위에 포함되어 있지 않음 또는 기간이 만료됨
}
