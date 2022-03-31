import type { FunnelChartData, FunnelChartProps } from './FunnelChart';
import utils from './utils';

const Controller = (props: FunnelChartProps) => {
  const { data, colors, sort, itemHeight, width, formatValueLabel } = props;

  const _width = width || utils.getWidth();

  const widthChart = _width / (_width > 500 ? 2.5 : 4);

  const chartColors = colors || utils.getColors(data.length);

  const getColor = (idx: number) => {
    idx = idx;
    while (idx >= chartColors.length) {
      idx -= chartColors.length;
    }
    return chartColors[idx];
  };

  const getData = () => {
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

    // return _data.map((i, idx) => {
    //   return {
    //     ...i,
    //     nextValue: data.length - 1 === idx ? null : _data[idx + 1].value,
    //   };
    // });
  };

  const getNextValue = (idx: number): number | null => {
    if (idx === data.length - 1) {
      return null;
    }
    return getData()[idx + 1].valuePercent;
  };

  const getValue = (item: FunnelChartData) => {
    if (formatValueLabel) {
      return formatValueLabel(item);
    }
    return item.value;
  };

  return {
    data: getData(),
    getNextValue,
    widthChartMax: widthChart + 34,
    widthChart,
    getValue,
    itemHeight: itemHeight || 30,
    paddingTopDiff: (itemHeight || 30) / 2,
  };
};

export default Controller;
