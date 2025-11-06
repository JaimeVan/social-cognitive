import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartView } from "@/components/charts/PieChartView";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { ImageDisplay } from "~/components/charts/ImageDisplay";
import { NetworkGraph } from "@/components/charts/NetworkGraph";
import { Button } from "@/components/ui/button";

/** 模拟 10 个群体 */
const groups = Array.from({ length: 10 }, (_, i) => `关键群体 ${i + 1}`);

/** 随机生成时间序列数据 */
function generateRandomTimeSeries(count = 50) {
  const data = [];
  const start = new Date(2025, 0, 1);
  let value = 100;
  for (let i = 0; i < count; i++) {
    const time = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    value += (Math.random() - 0.5) * 15; // 上下波动
    data.push({
      time: time.toISOString().slice(0, 10), // YYYY-MM-DD
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

export default function GroupsSection() {
  const [currentGroup, setCurrentGroup] = useState(0);

  // 每个群体都生成一份独立的随机时间序列数据
  const groupData = groups.map(() => generateRandomTimeSeries(60));

  return (
    <div className="grid gap-6">
      {/* 群体选择按钮 */}
      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {groups.map((g, i) => (
          <Button
            key={i}
            variant={i === currentGroup ? "default" : "outline"}
            onClick={() => setCurrentGroup(i)}
          >
            {g}
          </Button>
        ))}
      </div>

      {/* 上方两列图表 */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>关键词Top柱状图（模拟）</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex justify-center items-center">
            <ImageDisplay
              src="/images/keywords_top.png"
              alt="柱状图示例"
              className="h-[300px] object-contain"
            />
          </CardContent>
        </Card>

        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>主题占比</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex justify-center items-center">
            <PieChartView />
          </CardContent>
        </Card>
      </div>

      {/* 时间序列图 */}
      <Card>
        <CardHeader>
          <CardTitle>发帖时频</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart
            data={groupData[currentGroup]}
            xKey="time"
            yKey="value"
            color="#3b82f6"
            showLegend
            lineType="monotone"
          />
        </CardContent>
      </Card>

      {/* 网络结构图 */}
      <Card>
        <CardHeader>
          <CardTitle>群体结构图</CardTitle>
        </CardHeader>
        <CardContent>
          <NetworkGraph />
        </CardContent>
      </Card>
    </div>
  );
}
