import { BarDatum, ResponsiveBar } from '@nivo/bar';
import { ResponseData } from './ResponseData';
import { ChartProps, QueResInfo } from '../../../typings/statistic';
import { ChartSize, NotResponsor } from '../../../pages/Statistic/styles';

interface Props {
  data: BarDatum[];
}

export default function BarChart({ queInfo, options }: QueResInfo) {
  const { data } = ResponseData({ queInfo, options });

  const MyResponsiveBar = ({ data }: Props) => (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.25}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'accent' }}
      defs={[]}
      fill={[]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
    />
  );

  return (
    <ChartSize>
      {data.length === 0 ? (
        <NotResponsor>
          <span>응답자가 존재하지 않습니다!</span>
          <img src={'/images/noResponser.png'} alt="noResponse" />
        </NotResponsor>
      ) : (
        <MyResponsiveBar data={data} />
      )}
    </ChartSize>
  );
}
