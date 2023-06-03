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
} from './styles';
import { useParams } from 'react-router-dom';
import { useGetSingleForm } from '../../components/Form/hooks/useGetSingleForm';
import PieChart from '../../components/Statistic/PieChart';
import BarChart from '../../components/Statistic/BarChart';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';

export default function Statistic() {
  const { blue } = useRecoilValue(color);
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
        <QueWrapper>
          <QueTitle>1.질문 제목</QueTitle>
          <ChartBtn>
            <Button color={'#696969'} bgColor={blue} fontSize={1.2} width={10} height={4}>
              Pie Chart
            </Button>
            <Button color={'#696969'} bgColor={blue} fontSize={1.2} width={10} height={4}>
              Bar Chart
            </Button>
          </ChartBtn>
          <QueChart>
            <PieChart />
          </QueChart>
        </QueWrapper>

        <QueWrapper>
          <QueTitle>2.질문 제목</QueTitle>
          <ChartBtn>
            <Button color={'#696969'} bgColor={blue} fontSize={1.3} width={10} height={5}>
              Pie Chart
            </Button>
            <Button color={'#696969'} bgColor={blue} fontSize={1.3} width={10} height={5}>
              Bar Chart
            </Button>
          </ChartBtn>
          <QueChart>
            <BarChart />
          </QueChart>
        </QueWrapper>
      </ChartWrapper>
      {/* <PieChart /> */}
    </PageWrapper>
  );
}
