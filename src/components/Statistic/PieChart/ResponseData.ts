import { useRecoilValue } from 'recoil';
import { descriptionResInfo } from '../../../recoil/Statistic/atom';

interface DataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface Data {
  [id: string]: DataItem[];
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

  const data: Data = {};

  descriptionResultInfo.opList.forEach((op, index) => {
    if (op !== null) {
      const item: DataItem = {
        id: op,
        label: op,
        value: descriptionResultInfo.num[index],
        color: 'hsl(200, 70%, 50%)',
      };

      if (data[op]) {
        data[op].push(item);
      } else {
        data[op] = [item];
      }
    }
  });
  // descriptionResultInfo.opList.forEach((op, index) => {
  //   if (op !== null) {
  //     data.push({
  //       id: op!,
  //       label: op!,
  //       value: descriptionResultInfo.num[index],
  //       color: colors[Math.floor(Math.random() * colors.length)],
  //     });
  //   }
  // });

  // const data: DataItem[][] = [];
  // descriptionResultInfo.opList.forEach((op, index) => {
  //   if (op !== null) {
  //     data.push([
  //       {
  //         id: op!,
  //         label: op!,
  //         value: descriptionResultInfo.num[index],
  //         color: colors[Math.floor(Math.random() * colors.length)],
  //       },
  //     ]);
  //   }
  // });
  console.log(data);
  return {
    data,
  };
};
