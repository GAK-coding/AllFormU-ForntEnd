import { useRecoilValue } from 'recoil';
import { descriptionResInfo } from '../../../recoil/Statistic/atom';

export interface DataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface Data {
  data: DataItem[];
}

export const ResponseData = (): Data => {
  const descriptionResultInfo = useRecoilValue(descriptionResInfo);
  const colors = [
    'hsl(200, 70%, 50%)',
    'hsl(237, 70%, 50%)',
    'hsl(334, 70%, 50%)',
    'hsl(44, 70%, 50%)',
    'hsl(91, 70%, 50%)',
  ];

  const data: DataItem[] = descriptionResultInfo.opList
    .filter((op) => op !== null)
    .map((op, index) => ({
      id: op!,
      label: op!,
      value: descriptionResultInfo.num[index],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

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
