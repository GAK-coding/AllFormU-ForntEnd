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
    queInfo.opList.forEach((op, idx) => {
      if (op !== null) {
        data.push({
          id: op!,
          label: op!,
          value: queInfo.num[idx]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    });
  } else {
    queInfo.nums.forEach((num, idx) => {
      if (num !== 0) {
        data.push({
          id: num.toString(),
          label: num.toString(),
          value: queInfo.nums[idx]!,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      console.log();
      if (data.length === 0) {
        return null; // 빈 배열인 경우 null을 반환
      }
    });
  }

  console.log(data);
  return {
    data,
  };
};
