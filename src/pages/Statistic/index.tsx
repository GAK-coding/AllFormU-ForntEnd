import {
  ChartWrapper,
  InfoWrapper,
  PageWrapper,
  Info,
  HeadWrapper,
  QueTitle,
  QueWrapper,
  QueChart,
  ChartBtn,
  ResTitle,
} from './styles';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../components/Form/hooks/useGetSingleForm';
import PieChart from '../../components/Statistic/PieChart';
import BarChart from '../../components/Statistic/BarChart';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { useCallback, useState } from 'react';
import { DescriptionQue, SelectionQue } from '../../typings/makeForm';
import { useQuery } from 'react-query';
import { getQueResCount } from '../../api/statistic';

interface queResCount {
  question_id: number;
}
export default function Statistic() {
  const { blue } = useRecoilValue(color);
  const { id } = useParams();
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  console.log(data);
  const formatDateTime = (dateTime: string) => {
    const [year, month, day] = dateTime.split(' ');
    return `${year}.${month}.${day}`;
  };

  //TODO :문항별로 차트 다르게 뜨게하기
  const [chartType, setChartType] = useState<'Pie Chart' | 'Bar Chart'>('Pie Chart');

  const onChangeStatus = useCallback((action: 'Pie Chart' | 'Bar Chart') => {
    if (action === 'Pie Chart') {
      setChartType('Pie Chart');
    } else if (action === 'Bar Chart') {
      setChartType('Bar Chart');
    }
  }, []);
  const question_id = 105;
  const {
    data: queResCount,
    isLoading: queResCountLoading,
    isFetching: queResCountFetching,
  } = useQuery('queResCount', () => getQueResCount(105));

  return (
    <PageWrapper>
      <InfoWrapper>
        <span>{data?.title}</span>
        <img src={'/images/statistic.png'} alt="statistic" />

        <HeadWrapper>
          <span>응답기간</span>

          <Info>
            <span>{data?.timeout && formatDateTime(data.timeout[0])}</span>
            &nbsp;&nbsp;
            <span>~</span>&nbsp;&nbsp;
            <span>{data?.timeout && formatDateTime(data.timeout[1])}</span>
          </Info>

          <span>응답자</span>

          <Info>
            <span>{`${data?.responsor_count}명`}</span>
          </Info>
        </HeadWrapper>
      </InfoWrapper>

      <ChartWrapper>
        {data?.questions.map((question, index) => {
          // const { data: queResCount } = useQuery(
          //   `queResCount-${question.id}`, // 고유한 쿼리 키를 생성하기 위해 question.id를 사용
          //   () => {
          //     if (question.id) {
          //       return getQueResCount(question.id); // question.id 값이 존재하는 경우에만 호출
          //     }
          //   }
          // );

          return (
            <QueWrapper key={index}>
              <QueTitle>
                <span>{`Q${index + 1}. `} &nbsp;</span>
                {question.title}
              </QueTitle>
              {/* TODO : 각 문항에 대한 응답자로 변경 */}
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
        })}
      </ChartWrapper>
    </PageWrapper>
  );
}
