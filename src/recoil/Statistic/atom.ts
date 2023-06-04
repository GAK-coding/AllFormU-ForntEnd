import { DescriptionResStatistic } from '../../typings/statistic';
import { atom } from 'recoil';

export const descriptionResInfo = atom<DescriptionResStatistic>({
  key: 'descriptionResInfo',
  default: { response: [], opList: [], num: [] },
});
