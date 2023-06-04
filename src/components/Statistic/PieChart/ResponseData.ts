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
  console.log(data);
  return {
    // data: [
    //   {
    //     id: 'elixir',
    //     label: 'elixir',
    //     value: 31,
    //     color: 'hsl(200, 70%, 50%)',
    //   },
    //   {
    //     id: 'haskell',
    //     label: 'haskell',
    //     value: 337,
    //     color: 'hsl(237, 70%, 50%)',
    //   },
    //   {
    //     id: 'javascript',
    //     label: 'javascript',
    //     value: 42,
    //     color: 'hsl(334, 70%, 50%)',
    //   },
    //   {
    //     id: 'lisp',
    //     label: 'lisp',
    //     value: 75,
    //     color: 'hsl(44, 70%, 50%)',
    //   },
    //   {
    //     id: 'sass',
    //     label: 'sass',
    //     value: 229,
    //     color: 'hsl(91, 70%, 50%)',
    //   },
    // ],
    data,
  };
};
