import { BarDatum } from '@nivo/bar';

interface Data {
  data: BarDatum[];
}
export const ResponseData = (): Data => {
  return {
    data: [
      {
        country: 'AD',
        'hot dog': 112,
        'hot dogColor': 'hsl(204, 70%, 50%)',
        burger: 162,
        burgerColor: 'hsl(256, 70%, 50%)',
      },
      {
        country: 'AE',
        'hot dog': 124,
        'hot dogColor': 'hsl(216, 70%, 50%)',
        burger: 39,
        burgerColor: 'hsl(151, 70%, 50%)',
        // sandwich: 74,
        // sandwichColor: 'hsl(221, 70%, 50%)',
        // kebab: 175,
        // kebabColor: 'hsl(217, 70%, 50%)',
        // fries: 129,
        // friesColor: 'hsl(129, 70%, 50%)',
        // donut: 52,
        // donutColor: 'hsl(46, 70%, 50%)',
      },
      {
        country: 'AF',
        'hot dog': 26,
        'hot dogColor': 'hsl(198, 70%, 50%)',
        burger: 184,
        burgerColor: 'hsl(115, 70%, 50%)',
        // sandwich: 41,
        // sandwichColor: 'hsl(247, 70%, 50%)',
        // kebab: 181,
        // kebabColor: 'hsl(109, 70%, 50%)',
        // fries: 84,
        // friesColor: 'hsl(118, 70%, 50%)',
        // donut: 17,
        // donutColor: 'hsl(272, 70%, 50%)',
      },
      {
        country: 'AG',
        'hot dog': 22,
        'hot dogColor': 'hsl(92, 70%, 50%)',
        burger: 76,
        burgerColor: 'hsl(175, 70%, 50%)',
        // sandwich: 98,
        // sandwichColor: 'hsl(179, 70%, 50%)',
        // kebab: 113,
        // kebabColor: 'hsl(286, 70%, 50%)',
        // fries: 116,
        // friesColor: 'hsl(137, 70%, 50%)',
        // donut: 159,
        // donutColor: 'hsl(220, 70%, 50%)',
      },
      {
        country: 'AI',
        'hot dog': 16,
        'hot dogColor': 'hsl(130, 70%, 50%)',
        burger: 184,
        burgerColor: 'hsl(112, 70%, 50%)',
        // sandwich: 99,
        // sandwichColor: 'hsl(11, 70%, 50%)',
        // kebab: 171,
        // kebabColor: 'hsl(331, 70%, 50%)',
        // fries: 91,
        // friesColor: 'hsl(127, 70%, 50%)',
        // donut: 119,
        // donutColor: 'hsl(354, 70%, 50%)',
      },
      {
        country: 'AL',
        'hot dog': 185,
        'hot dogColor': 'hsl(289, 70%, 50%)',
        burger: 12,
        burgerColor: 'hsl(11, 70%, 50%)',
        // sandwich: 117,
        // sandwichColor: 'hsl(304, 70%, 50%)',
        // kebab: 137,
        // kebabColor: 'hsl(58, 70%, 50%)',
        // fries: 8,
        // friesColor: 'hsl(33, 70%, 50%)',
        // donut: 125,
        // donutColor: 'hsl(203, 70%, 50%)',
      },
      {
        country: 'AM',
        'hot dog': 195,
        'hot dogColor': 'hsl(25, 70%, 50%)',
        burger: 193,
        burgerColor: 'hsl(299, 70%, 50%)',
        // sandwich: 182,
        // sandwichColor: 'hsl(131, 70%, 50%)',
        // kebab: 20,
        // kebabColor: 'hsl(100, 70%, 50%)',
        // fries: 180,
        // friesColor: 'hsl(155, 70%, 50%)',
        // donut: 29,
        // donutColor: 'hsl(257, 70%, 50%)',
      },
    ],
  };
};
