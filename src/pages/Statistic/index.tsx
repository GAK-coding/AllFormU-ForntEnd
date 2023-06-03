import { ChartWrapper, InfoWrapper, PageWrapper, Date, DateWrapper } from './styles';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../components/Form/hooks/useGetSingleForm';
import PieChart from '../../components/Statistic/PieChart';

export default function Statistic() {
  const { id } = useParams();
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  console.log(data);

  const formatDateTime = (dateTime: string) => {
    const [year, month, day, hours, minutes] = dateTime.split(' ');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <PageWrapper>
      <InfoWrapper>
        <span>{data?.title}</span>
        <img src={'/images/statistic.png'} alt="statistic" />

        <DateWrapper>
          <span>응답기간</span>

          <Date>
            <span>{data?.timeout && formatDateTime(data.timeout[0])}</span>
            <span>~</span>
            <span>{data?.timeout && formatDateTime(data.timeout[1])}</span>
          </Date>
        </DateWrapper>
        {/* 총 응답자  */}
      </InfoWrapper>
      <ChartWrapper>
        <PieChart />
      </ChartWrapper>
      {/* <PieChart /> */}
    </PageWrapper>
  );
}
