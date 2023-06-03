interface Data {
  data: object[];
}
export const ResponseData = (): Data => {
  return {
    data: [
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
    ],
  };
};
