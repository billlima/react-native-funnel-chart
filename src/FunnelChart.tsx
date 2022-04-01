import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Controller from './controller';
import type { FunnelChartData, FunnelChartProps } from './interfaces';
import styles from './styles';

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

    const points = ctrl.getPointsSvg(w, value, nextValue);

    return (
      <View style={[styles.chartItemContainer, { width: wMax }]} key={idx}>
        <Svg width={w} height={ctrl.itemHeight} style={styles.svg}>
          <Polygon points={points} fill={color} />
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
      <View style={[styles.labelsContainer, { flex: props.labelsFlex || 2 }]}>
        {ctrl.data.map(labelText)}
      </View>
      <View
        style={{ paddingTop: ctrl.paddingTopDiff, width: ctrl.widthChartMax }}
      >
        {line()}
        {ctrl.data.map((item, idx) =>
          itemChart(
            idx,
            ctrl.widthChartMax,
            ctrl.widthChart,
            item.valuePercent!,
            ctrl.getNextValue(idx),
            item.color!
          )
        )}
      </View>
      <View style={[styles.valuesContainer, { flex: props.valuesFlex || 1 }]}>
        {ctrl.data.map(valueText)}
      </View>
    </View>
  );
};

export default FunnelChart;
