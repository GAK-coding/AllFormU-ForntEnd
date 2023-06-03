import { ChartWrapper, InfoWrapper, PageWrapper, Info, HeadWrapper } from './styles';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../components/Form/hooks/useGetSingleForm';
import PieChart from '../../components/Statistic/PieChart';

export default function Statistic() {
  const { id } = useParams();
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
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

          <span>응답자</span>

          <Info>
            <span>2명</span>
          </Info>
        </HeadWrapper>
        {/* 총 응답자  */}
      </InfoWrapper>
      <ChartWrapper>
        <PieChart />
      </ChartWrapper>
      {/* <PieChart /> */}
    </PageWrapper>
  );
}
