import { ResponsivePie } from '@nivo/pie';
interface Props {
  data: object[];
}

export default function PieChart() {
  const data = [
    {
      id: 'elixir',
      label: 'elixir',
      value: 31,
      color: 'hsl(200, 70%, 50%)',
    },
    {
      id: 'haskell',
      label: 'haskell',
      value: 337,
      color: 'hsl(237, 70%, 50%)',
    },
    {
      id: 'javascript',
      label: 'javascript',
      value: 42,
      color: 'hsl(334, 70%, 50%)',
    },
    {
      id: 'lisp',
      label: 'lisp',
      value: 75,
      color: 'hsl(44, 70%, 50%)',
    },
    {
      id: 'sass',
      label: 'sass',
      value: 229,
      color: 'hsl(91, 70%, 50%)',
    },
  ];

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
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
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

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <MyResponsivePie data={data} />
    </div>
  );
}
