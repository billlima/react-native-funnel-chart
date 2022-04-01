import type { FunnelChartData, FunnelChartProps } from './interfaces';
import utils from './utils';

const Controller = (props: FunnelChartProps) => {
  const { data, colors, sort, formatValueLabel } = props;

  const width = props.width || utils.getWidth();
  const itemHeight = props.itemHeight || 30;
  const widthChart = width / (width > 500 ? 2.5 : 4);
  const chartColors = colors || utils.getColors(data.length);

  const getColor = (idx: number) => {
    while (idx >= chartColors.length) {
      idx -= chartColors.length;
    }
    return chartColors[idx];
  };

  const getData = (): FunnelChartData[] => {
    let _data = data || [];

    const maxValue = _data
      .map((i) => i.value)
      .reduce((a, b) => {
        return Math.max(a, b);
      }, -Infinity);

    if (sort === undefined || sort) {
      _data = _data.sort((a, b) => b.value - a.value);
    }

    return _data.map((i, idx) => {
      const p = utils.getPercent(i.value, maxValue);

      return {
        ...i,
        valuePercent: utils.getValueFromPercent(p, widthChart),
        color: i.color || getColor(idx),
      };
    });
  };

  const isLastItem = (idx: number): boolean => {
    return idx === data.length - 1;
  };

  const getNextValue = (idx: number): number | null => {
    return isLastItem(idx) ? null : getData()[idx + 1].valuePercent!;
  };

  const getValue = (item: FunnelChartData) => {
    return formatValueLabel ? formatValueLabel(item) : item.value;
  };

  const getPointsSvg = (
    maxWidth: number,
    value: number,
    nextValue: number
  ): string => {
    const pointsUp = utils.get2HorizontallyPointsSvg(maxWidth, value, 0);
    const pointsDown = utils.get2HorizontallyPointsSvg(
      maxWidth,
      nextValue,
      itemHeight,
      true
    );
    return `${pointsUp} ${pointsDown}`;
  };

  return {
    data: getData(),
    widthChartMax: widthChart + 34,
    widthChart,
    itemHeight: itemHeight || 30,
    paddingTopDiff: (itemHeight || 30) / 2,

    getNextValue,
    getValue,
    getPointsSvg,
  };
};

export default Controller;
