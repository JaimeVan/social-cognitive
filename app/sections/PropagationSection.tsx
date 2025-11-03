import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkGraph } from "@/components/charts/NetworkGraph";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";

export default function PropagationSection() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader><CardTitle>传播关系网络</CardTitle></CardHeader>
        <CardContent><NetworkGraph /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>传播时间特征分析</CardTitle></CardHeader>
        <CardContent><TimeSeriesChart /></CardContent>
      </Card>
    </div>
  );
}