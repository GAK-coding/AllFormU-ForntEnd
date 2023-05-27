export function linearList(start: number, end: number) {
  const numberArray: { value: string; label: string }[] = [];

  for (let i = start; i <= end; i++) {
    numberArray.push({ value: i.toString(), label: i.toString() });
  }
  return numberArray;
}
