import OverviewSection from "@/sections/OverviewSection";
import PropagationSection from "@/sections/PropagationSection";
import GroupsSection from "@/sections/GroupsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analysis() {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">认知测绘分析仪表板</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex justify-center mb-6">
          <TabsTrigger value="overview">整体舆论演化</TabsTrigger>
          <TabsTrigger value="propagation">传播路径分析</TabsTrigger>
          <TabsTrigger value="groups">关键群体分析</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><OverviewSection /></TabsContent>
        <TabsContent value="propagation"><PropagationSection /></TabsContent>
        <TabsContent value="groups"><GroupsSection /></TabsContent>
      </Tabs>
    </div>
  );
}
