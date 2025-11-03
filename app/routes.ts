import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 默认首页跳转到上传页
  index("routes/home.tsx"),

  // 使用布局包裹的路由
  route("/", "routes/layouts/AppLayout.tsx", [
    // 上传输入页
    route("input", "routes/input.tsx"),

    // 加载页
    route("loading", "routes/loading.tsx"),

    // 分析仪表板页
    route("analysis", "routes/analysis.tsx"),
  ]),
] satisfies RouteConfig;
