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
import { getDescriptionResCount } from '../../api/statistic';
import Question from '../../components/Statistic/Question';

export default function Statistic() {
  const { blue } = useRecoilValue(color);
  const { id } = useParams();
  const [data, isLoading, isFetching] = useGetSingleForm(id!, true);
  console.log(data);
  const formatDateTime = (dateTime: string) => {
    const [year, month, day] = dateTime.split(' ');
    return `${year}.${month}.${day}`;
  };

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

          <span>전체 응답자</span>

          <Info>
            <span>{`${data?.responsor_count}명`}</span>
          </Info>
        </HeadWrapper>
      </InfoWrapper>

      <ChartWrapper>
        {data?.questions.map((question, index) => {
          return <Question id={question.id!} index={index} title={question.title} type={question.type} />;
        })}
      </ChartWrapper>
    </PageWrapper>
  );
}
