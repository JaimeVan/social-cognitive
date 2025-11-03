import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartView } from "@/components/charts/PieChartView";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { ImageDisplay } from "~/components/charts/ImageDisplay";
import { NetworkGraph } from "@/components/charts/NetworkGraph";
import { Button } from "@/components/ui/button";

const groups = Array.from({ length: 10 }, (_, i) => `关键群体 ${i + 1}`);

export default function GroupsSection() {
  const [currentGroup, setCurrentGroup] = useState(0);

  return (
    <div className="grid gap-6">
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

      <Card>
        <CardHeader><CardTitle>发帖时频</CardTitle></CardHeader>
        <CardContent><TimeSeriesChart /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>群体结构图</CardTitle></CardHeader>
        <CardContent><NetworkGraph /></CardContent>
      </Card>
    </div>
  );
}