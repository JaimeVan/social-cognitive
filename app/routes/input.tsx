import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Input() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (file) navigate("/analysis");
  };

  return (
    <div className="flex items-center justify-center h-full p-8">
      <Card className="w-[400px] p-6 shadow-lg">
        <CardHeader>
          <CardTitle>上传数据文件（JSON）</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <input
            type="file"
            accept=".json"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border rounded p-2"
          />
          <Button onClick={handleSubmit} disabled={!file}>
            开始分析
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
