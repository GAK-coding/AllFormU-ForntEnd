import { ResponsivePie } from '@nivo/pie';
import { ResponseData } from './ResponseData';
import { ChartSize, NotResponsor } from '../../../pages/Statistic/styles';
import { DescriptionResStatistic, QueResInfo } from '../../../typings/statistic';

interface Props {
  data: object[];
}

export default function PieChart({ queInfo, options }: QueResInfo) {
  const { data } = ResponseData({ queInfo, options });
  const MyResponsivePie = ({ data }: Props) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.4}
      padAngle={1}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'accent' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.4]],
      }}
      arcLinkLabelsTextColor="#2d2d2d"
      arcLinkLabelsStraightLength={17}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabel="value"
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 3]],
      }}
      defs={[]}
      fill={[]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'top-to-bottom',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
  console.log(data);
  return (
    <ChartSize>
      {data.length === 0 ? (
        <NotResponsor>
          <span>응답자가 존재하지 않습니다!</span>
          <img src={'/images/noResponser.png'} alt="noResponse" />
        </NotResponsor>
      ) : (
        <MyResponsivePie data={data} />
      )}
    </ChartSize>
  );
}
