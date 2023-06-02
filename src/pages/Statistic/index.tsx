import { ChartWrapper, InfoWrapper, PageWrapper } from './styles';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../components/Form/hooks/useGetSingleForm';

export default function Statistic() {
  const { id } = useParams();
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  console.log(data);

  return (
    <PageWrapper>
      <InfoWrapper>
        <span>{data?.title}</span>
        <span>{data?.content}</span>

        {/* 시작날짜, 종료날짜 추가 */}
      </InfoWrapper>
      <ChartWrapper>차트야</ChartWrapper>
    </PageWrapper>
  );
}
