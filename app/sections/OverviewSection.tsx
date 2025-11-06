import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordCloudSlider } from "@/components/charts/WordCloudSlider";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";

/** 随机生成时间序列数据 */
function generateRandomSeries(
  count = 60,
  { base = 100, volatility = 10, min = 0, max = 200 } = {}
) {
  const data = [];
  const start = new Date(2025, 0, 1);
  let value = base;
  for (let i = 0; i < count; i++) {
    const time = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    value += (Math.random() - 0.5) * volatility;
    value = Math.min(Math.max(value, min), max);
    data.push({
      time: time.toISOString().slice(0, 10),
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

/** 情感值序列（在 -1 到 1 之间随机波动） */
function generateSentimentSeries(count = 60) {
  const data = [];
  const start = new Date(2025, 0, 1);
  let sentiment = Math.random() * 0.4 - 0.2; // 初始值略偏中性
  for (let i = 0; i < count; i++) {
    const time = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    sentiment += (Math.random() - 0.5) * 0.2;
    sentiment = Math.min(Math.max(sentiment, -1), 1);
    data.push({
      time: time.toISOString().slice(0, 10),
      value: Math.round(sentiment * 100) / 100,
    });
  }
  return data;
}

export default function OverviewSection() {
  const popularityData = generateRandomSeries(60, {
    base: 80,
    volatility: 15,
    min: 0,
    max: 200,
  });
  const sentimentData = generateSentimentSeries(60);

  return (
    <div className="grid gap-6">
      {/* 第一行：词云 + 流行度 */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>关键词词云演化</CardTitle>
          </CardHeader>
          <CardContent>
            <WordCloudSlider />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>流行度演变</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSeriesChart
              data={popularityData}
              xKey="time"
              yKey="value"
              color="#3b82f6"
              showLegend
              lineType="monotone"
            />
          </CardContent>
        </Card>
      </div>

      {/* 第二行：情感倾向 */}
      <Card>
        <CardHeader>
          <CardTitle>情感倾向演变</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart
            data={sentimentData}
            xKey="time"
            yKey="value"
            color="#f59e0b"
            showLegend
            lineType="monotone"
          />
        </CardContent>
      </Card>
    </div>
  );
}
