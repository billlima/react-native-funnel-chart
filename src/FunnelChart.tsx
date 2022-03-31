import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Controller from './controller';
import styles from './styles';

export interface FunnelChartData {
  value: number;
  text: string;
  color?: string;
}

export interface FunnelChartProps {
  data: Array<FunnelChartData>;
  colors?: Array<string>;
  sort?: boolean;
  itemHeight?: number;
  width?: number;
  labelStyle?: any;
  valueStyle?: any;
  labelNumberOfLines?: number;
  formatValueLabel?: (item: FunnelChartData) => any;
  onTextPress?: (item: FunnelChartData) => void;
}

const FunnelChart = (props: FunnelChartProps) => {
  const ctrl = Controller(props);

  const line = () => {
    return (
      <View style={styles.lineContainer}>
        <View style={styles.lineStyle} />
      </View>
    );
  };

  const labelText = (item: FunnelChartData, idx: number) => {
    const content = (
      <View
        key={idx}
        style={[styles.textContainer, { height: ctrl.itemHeight }]}
      >
        <Text
          key={idx}
          style={[styles.textRight, props.labelStyle || {}]}
          numberOfLines={props.labelNumberOfLines || 1}
        >
          {item.text}
        </Text>
      </View>
    );

    if (!props.onTextPress) {
      return content;
    }

    return (
      <TouchableOpacity key={idx} onPress={() => props.onTextPress!(item)}>
        {content}
      </TouchableOpacity>
    );
  };

  const valueText = (item: FunnelChartData, idx: number) => {
    return (
      <View
        key={idx}
        style={[styles.textContainer, { height: ctrl.itemHeight }]}
      >
        <Text key={idx} style={[styles.textLeft, props.valueStyle || {}]}>
          {ctrl.getValue(item)}
        </Text>
      </View>
    );
  };

  const itemChart = (
    idx: number,
    wMax: number,
    w: number,
    value: number,
    nextValue: number | null,
    color: string
  ) => {
    if (nextValue == null) {
      return (
        <View
          key={idx}
          style={{ paddingTop: ctrl.paddingTopDiff, width: wMax }}
        />
      );
    }

    const calcP = (
      max: number,
      v: number,
      y: number,
      inverted: boolean = false
    ) => {
      const x1 = max / 2 - v / 2;
      const x2 = max / 2 + v / 2;
      return `${inverted ? x2 : x1},${y} ${inverted ? x1 : x2},${y}`;
    };

    const p1 = calcP(w, value, 0);
    const p2 = calcP(w, nextValue, ctrl.itemHeight, true);

    return (
      <View style={[styles.chartItemContainer, { width: wMax }]} key={idx}>
        <Svg width={w} height={ctrl.itemHeight} style={styles.svg}>
          <Polygon points={`${p1} ${p2}`} fill={color} />
        </Svg>
        {line()}
      </View>
    );
  };

  if (!ctrl.data?.length) {
    return (
      <View>
        <Text>empty data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.chartContainer, { width: props.width || 'auto' }]}>
      <View style={[styles.labelsContainer]}>{ctrl.data.map(labelText)}</View>
      <View
        style={{ paddingTop: ctrl.paddingTopDiff, width: ctrl.widthChartMax }}
      >
        {line()}
        {ctrl.data.map((item, idx) =>
          itemChart(
            idx,
            ctrl.widthChartMax,
            ctrl.widthChart,
            item.valuePercent,
            ctrl.getNextValue(idx),
            item.color
          )
        )}
      </View>
      <View style={styles.valuesContainer}>{ctrl.data.map(valueText)}</View>
    </View>
  );
};

export default FunnelChart;
