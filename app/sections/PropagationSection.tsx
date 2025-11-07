import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkGraph } from "@/components/charts/NetworkGraph";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";

// 生成随机时间序列数据
function generateRandomTimeSeries(count = 50) {
  const data = [];
  const start = new Date(2025, 0, 1); // 从 2025 年 1 月 1 日开始

  let value = 100;
  for (let i = 0; i < count; i++) {
    const time = new Date(start.getTime() + i * 24 * 60 * 60 * 1000); // 每天递增
    // 模拟波动：随机上下浮动
    value += (Math.random() - 0.5) * 10;
    data.push({
      time: time.toISOString().slice(0, 10), // 格式化为 YYYY-MM-DD
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

export default function PropagationSection() {
  const randomData = generateRandomTimeSeries(60); // 生成 60 条数据

  return (
    <div className="grid gap-6">
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle>传播关系网络</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex justify-center items-center">
          <NetworkGraph fileUrl="/graph/community_graph.gml"/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>传播时间特征分析</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart
            data={randomData}
            xKey="time"
            yKey="value"
            color="#ef4444"
            showLegend
            lineType="monotone"
          />
        </CardContent>
      </Card>
    </div>
  );
}
