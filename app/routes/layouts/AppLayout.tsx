import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  FileText,
  ListCheck,
  BarChart3,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Navbar 组件
function Navbar({ showTopicSelect }: { showTopicSelect: boolean }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center space-x-2">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-semibold">认知测绘系统</span>
      </div>

      {showTopicSelect && (
        <div className="flex items-center space-x-3">
          <Select defaultValue="topic1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择舆论话题" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="topic1">证监会</SelectItem>
              <SelectItem value="topic2">国内经济舆论环境</SelectItem>
              <SelectItem value="topic3">科技趋势</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

// Sidebar 组件
function Sidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const menuItems = [
    { label: "上传文件", icon: FileText, path: "/input" },
    { label: "分析任务队列", icon: ListCheck, path: "/loading" },
    { label: "报告查看", icon: BarChart3, path: "/analysis" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-56"
      } bg-white border-r h-screen p-4 flex flex-col transition-all duration-300`}
    >
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5 mr-2" />
            {!collapsed && item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}

// AppLayout 主组件
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // 只有在 /analysis 页面显示话题选择
  const showTopicSelect = location.pathname === "/analysis";

  return (
    <div className="flex flex-col h-screen">
      <Navbar showTopicSelect={showTopicSelect} />

      <div className="flex flex-1 overflow-hidden">
        {/* 桌面端侧边栏 */}
        <div className="hidden md:block">
          <Sidebar collapsed={collapsed} />
        </div>

        {/* 移动端抽屉 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="m-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-56">
              <Sidebar collapsed={false} />
            </SheetContent>
          </Sheet>
        </div>

        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
