import { DescriptionResStatistic, QueInfo } from '../../../typings/statistic';
import { ChartBtn, QueChart, QueTitle, QueWrapper, ResTitle } from '../../../pages/Statistic/styles';
import Button from '../../ui/Button';
import PieChart from '../PieChart';
import BarChart from '../BarChart';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { useQuery } from 'react-query';
import { getDescriptionResCount, getDescriptionStatisticEach } from '../../../api/statistic';
// import { getQueResCount, getStatisticEach } from '../../../api/statistic';

export default function Question({ id, index, title }: QueInfo) {
  const { blue } = useRecoilValue(color);
  const [eachQueInfo, setEachQueInfo] = useState<DescriptionResStatistic>();
  const [chartType, setChartType] = useState<'Pie Chart' | 'Bar Chart'>('Pie Chart');
  // const [eachQueCount, setEachQueCount] = useState<number>(0);
  const onChangeStatus = useCallback((action: 'Pie Chart' | 'Bar Chart') => {
    if (action === 'Pie Chart') {
      setChartType('Pie Chart');
    } else if (action === 'Bar Chart') {
      setChartType('Bar Chart');
    }
  }, []);

  //TODO : null인 것 count 하는 로직 추가
  const { data: queResCount, isSuccess: isQueResCount } = useQuery(['queResCount', id], () =>
    getDescriptionResCount(id!)
  );
  const { data: queStatistic, isSuccess: isQueStatistic } = useQuery(['queStatistic', id], () =>
    getDescriptionStatisticEach(id!)
  );

  useEffect(() => {
    setEachQueInfo(queStatistic);
  }, [queStatistic]);

  console.log(eachQueInfo);

  //TODO : 나중에 null 값 처리해야함
  // useEffect(() => {
  //   if (isQueResCount && isQueStatistic) {
  //     const queNull = queResCount?.count!;
  //     const queRes = queResInfo?.num[0];
  //     setEachQueCount(queNull - queRes);
  //   }
  // }, [isQueResCount, isQueStatistic]);

  return (
    <QueWrapper key={index}>
      <QueTitle>
        <span>{`Q${index + 1}. `} &nbsp;</span>
        {title}
      </QueTitle>
      <ResTitle>
        <span>{`응답자 : ${queResCount} 명`}</span>
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
      <QueChart>
        {chartType === 'Pie Chart' && eachQueInfo ? <PieChart queInfo={eachQueInfo} /> : <BarChart />}
      </QueChart>
    </QueWrapper>
  );
}
