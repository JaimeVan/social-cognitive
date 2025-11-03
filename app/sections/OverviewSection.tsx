import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordCloudSlider } from "@/components/charts/WordCloudSlider";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";

export default function OverviewSection() {
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
            <TimeSeriesChart />
          </CardContent>
        </Card>
      </div>

      {/* 第二行：情感倾向 */}
      <Card>
        <CardHeader>
          <CardTitle>情感倾向演变</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart />
        </CardContent>
      </Card>
    </div>
  );
}
