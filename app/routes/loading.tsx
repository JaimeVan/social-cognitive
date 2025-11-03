import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate("/analysis"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      <p className="mt-4 text-gray-600">正在分析数据，请稍候...</p>
    </div>
  );
}