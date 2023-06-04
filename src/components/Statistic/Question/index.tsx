import { QueInfo } from '../../../typings/statistic';
import { ChartBtn, QueChart, QueTitle, QueWrapper, ResTitle } from '../../../pages/Statistic/styles';
import Button from '../../ui/Button';
import PieChart from '../PieChart';
import BarChart from '../BarChart';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../Form/hooks/useGetSingleForm';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { useQuery } from 'react-query';
import { getQueResCount } from '../../../api/statistic';

export default function Question({ id, index }: QueInfo) {
  const { blue } = useRecoilValue(color);

  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  const [chartType, setChartType] = useState<'Pie Chart' | 'Bar Chart'>('Pie Chart');

  const onChangeStatus = useCallback((action: 'Pie Chart' | 'Bar Chart') => {
    if (action === 'Pie Chart') {
      setChartType('Pie Chart');
    } else if (action === 'Bar Chart') {
      setChartType('Bar Chart');
    }
  }, []);

  const question_id = data?.questions[index].id;
  const { data: queResCount } = useQuery('queResCount', () => getQueResCount(question_id!));

  return (
    <QueWrapper key={index}>
      <QueTitle>
        <span>{`Q${index + 1}. `} &nbsp;</span>
        {data?.questions[index].title}
      </QueTitle>
      <ResTitle>
        <span>{`응답자 : ${queResCount}명`}</span>
      </ResTitle>
      <ChartBtn>
        <Button
          onClick={() => onChangeStatus('Pie Chart')}
          color={'#696969'}
          bgColor={blue}
          fontSize={1.2}
          width={10}
          height={4}
        >
          Pie Chart
        </Button>
        <Button
          onClick={() => onChangeStatus('Bar Chart')}
          color={'#696969'}
          bgColor={blue}
          fontSize={1.2}
          width={10}
          height={4}
        >
          Bar Chart
        </Button>
      </ChartBtn>
      <QueChart>{chartType === 'Pie Chart' ? <PieChart /> : <BarChart />}</QueChart>
    </QueWrapper>
  );
}
