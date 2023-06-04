import { useRecoilValue } from 'recoil';
import { descriptionResInfo } from '../../../recoil/Statistic/atom';
import { QueResInfo } from '../../../typings/statistic';

export interface DataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface Data {
  data: DataItem[];
}

export const ResponseData = ({ queInfo }: QueResInfo): Data => {
  const colors = [
    'hsl(200, 70%, 50%)',
    'hsl(237, 70%, 50%)',
    'hsl(334, 70%, 50%)',
    'hsl(44, 70%, 50%)',
    'hsl(91, 70%, 50%)',
  ];

  console.log(queInfo);
  const data: DataItem[] = [];

  if ('response' in queInfo) {
    queInfo.opList.forEach((op, index) => {
      if (op !== null) {
        data.push({
          id: op!,
          label: op!,
          value: queInfo.num[index]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    });
  } else {
    queInfo.nums.forEach((num, index) => {
      if (num !== null) {
        data.push({
          id: num.toString(),
          label: num.toString(),
          value: queInfo.nums[index]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    });
  }

  console.log(data);
  return {
    data,
  };
};
