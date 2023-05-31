import { Option } from '../typings/makeForm';

export function getContentByValue(options: Option[], value: string): string | undefined {
  if (options.length === 0) {
    return undefined;
  }
  if (value === '1') {
    const maxItem = options.reduce((prev, curr) => {
      return parseInt(curr.content) > parseInt(prev.content) ? curr : prev;
    });
    return maxItem.content;
  } else if (value === '0') {
    const minItem = options.reduce((prev, curr) => {
      return parseInt(curr.content) < parseInt(prev.content) ? curr : prev;
    });
    return minItem.content;
  }
  return undefined;
}
