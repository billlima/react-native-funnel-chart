export interface FunnelChartData {
  value: number;
  text: string;
  color?: string;
  valuePercent?: number;
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
  labelsFlex?: number;
  valuesFlex?: number;
  formatValueLabel?: (item: FunnelChartData) => any;
  onTextPress?: (item: FunnelChartData) => void;
}
