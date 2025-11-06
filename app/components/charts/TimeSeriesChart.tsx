import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TimeSeriesChartProps {
  /** 图表数据，例如：[{ time: "1月", temperature: 30 }] */
  data: Record<string, any>[];
  /** x轴字段名（通常为时间） */
  xKey: string;
  /** y轴字段名（数值字段） */
  yKey: string;
  /** 图表颜色 */
  color?: string;
  /** 高度，默认 300 */
  height?: number;
  /** 是否显示网格 */
  showGrid?: boolean;
  /** 是否显示提示框 */
  showTooltip?: boolean;
  /** 是否显示图例 */
  showLegend?: boolean;
  /** 是否显示Y轴 */
  showYAxis?: boolean;
  /** 线条类型，可选: "monotone" | "linear" | "step" */
  lineType?: "monotone" | "linear" | "step";
}

/**
 * 通用时间序列折线图组件
 */
export function TimeSeriesChart({
  data,
  xKey,
  yKey,
  color = "#3b82f6",
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  showYAxis = true,
  lineType = "monotone",
}: TimeSeriesChartProps) {
  return (
    <ResponsiveContainer height={height}>
      <LineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xKey} />
        {showYAxis && <YAxis />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        <Line type={lineType} dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
