import { DescriptionResStatistic, QueInfo, SelectionResStatistic } from '../../../typings/statistic';
import { ChartBtn, QueChart, QueTitle, QueWrapper, ResTitle } from '../../../pages/Statistic/styles';
import Button from '../../ui/Button';
import PieChart from '../PieChart';
import BarChart from '../BarChart';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { useQuery } from 'react-query';
import {
  getDescriptionResCount,
  getDescriptionStatisticEach,
  getSelectionResCount,
  getSelectionStatisticEach,
} from '../../../api/statistic';

type ResStatistic = DescriptionResStatistic | SelectionResStatistic;

export default function Question({ id, index, title, type, options }: QueInfo) {
  const { blue } = useRecoilValue(color);
  const [eachQueInfo, setEachQueInfo] = useState<ResStatistic>();
  const [chartType, setChartType] = useState<'Pie Chart' | 'Bar Chart'>('Pie Chart');
  // const [eachQueCount, setEachQueCount] = useState<number>(0);
  const onChangeStatus = useCallback((action: 'Pie Chart' | 'Bar Chart') => {
    if (action === 'Pie Chart') {
      setChartType('Pie Chart');
    } else if (action === 'Bar Chart') {
      setChartType('Bar Chart');
    }
  }, []);

  // console.log(eachQueInfo);

  //TODO : 나중에 null 값 처리해야함
  // useEffect(() => {
  //   if (isQueResCount && isQueStatistic) {
  //     const queNull = queResCount?.count!;
  //     const queRes = queResInfo?.num[0];
  //     setEachQueCount(queNull - queRes);
  //   }
  // }, [isQueResCount, isQueStatistic]);

  if (type.includes('Description')) {
    const { data: queResCount, isSuccess: isQueResCount } = useQuery(['queDesResCount', id], () =>
      getDescriptionResCount(id!)
    );
    const { data: queStatistic, isSuccess: isQueStatistic } = useQuery(['queDesStatistic', id], () =>
      getDescriptionStatisticEach(id!)
    );

    useEffect(() => {
      setEachQueInfo(queStatistic);
    }, [queStatistic]);

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
          {/* <Button */}
          {/*   onClick={() => onChangeStatus('Bar Chart')} */}
          {/*   color={'#696969'} */}
          {/*   bgColor={blue} */}
          {/*   fontSize={1.2} */}
          {/*   width={10} */}
          {/*   height={4} */}
          {/* > */}
          {/*   Bar Chart */}
          {/* </Button> */}
        </ChartBtn>
        <QueChart>
          {eachQueInfo &&
            ((chartType === 'Pie Chart' && <PieChart queInfo={eachQueInfo} />) ||
              (chartType === 'Bar Chart' && <BarChart queInfo={eachQueInfo} />))}
        </QueChart>
      </QueWrapper>
    );
  } else {
    const { data: queResCount, isSuccess: isQueResCount } = useQuery(['queSelectResCount', id], () =>
      getSelectionResCount(id!)
    );
    const { data: queStatistic, isSuccess: isQueStatistic } = useQuery(['queSelectStatistic', id], () =>
      getSelectionStatisticEach(id!)
    );

    useEffect(() => {
      setEachQueInfo(queStatistic);
    }, [queStatistic]);

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
          {/* <Button */}
          {/*   onClick={() => onChangeStatus('Bar Chart')} */}
          {/*   color={'#696969'} */}
          {/*   bgColor={blue} */}
          {/*   fontSize={1.2} */}
          {/*   width={10} */}
          {/*   height={4} */}
          {/* > */}
          {/*   Bar Chart */}
          {/* </Button> */}
        </ChartBtn>
        <QueChart>
          {eachQueInfo &&
            ((chartType === 'Pie Chart' && <PieChart queInfo={eachQueInfo} options={options} />) ||
              (chartType === 'Bar Chart' && <BarChart queInfo={eachQueInfo} options={options} />))}
        </QueChart>
      </QueWrapper>
    );
  }
}
