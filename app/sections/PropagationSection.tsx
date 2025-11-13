import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkGraph } from "@/components/charts/NetworkGraph";


export default function PropagationSection() {

  return (
    <div className="grid gap-6 h-screen p-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>传播关系网络</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex justify-center items-center">
          <NetworkGraph fileUrl="/graph/overall_graph_all_communities.gml" />
        </CardContent>
      </Card>
    </div>
  );
}
