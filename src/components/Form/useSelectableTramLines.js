// Just a file to keep the info for selectable full tram lines
const useSelectableTramLines = () => {
  const selectableTramLineInfo = [
    {
      id: '4546',
      routeName: 'Birmingham - Wolverhampton - Birmingham',
      serviceNumber: 'MM1',
    },
  ];

  const selectableTramLineIds = selectableTramLineInfo.map((line) => line.id);
  return { selectableTramLineInfo, selectableTramLineIds };
};

export default useSelectableTramLines;
