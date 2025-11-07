"use client";

import React, { useEffect, useState, useRef } from "react";

interface GMLNode {
  id: string;
  label?: string;
  [key: string]: any;
}

interface GMLEdge {
  source: string;
  target: string;
  [key: string]: any;
}

interface GraphData {
  nodes: GMLNode[];
  links: GMLEdge[];
}

interface GMLViewerProps {
  fileUrl: string;
  showLabels?: boolean;
}

/** ==============================
 * 🧩 GML 解析函数（不变）
 * ============================== */
function parseGML(text: string): GraphData {
  const cleaned = text
    .replace(/#.*$/gm, "")
    .replace(/\r/g, "")
    .trim();

  const nodes: GMLNode[] = [];
  const links: GMLEdge[] = [];
  const blockRegex = /(node|edge)\s*\[([\s\S]*?)\]/g;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(cleaned)) !== null) {
    const [, type, block] = match;
    const props: Record<string, any> = {};
    const lines = block.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const m = trimmed.match(/^(\w+)\s+((?:"[^"]*")|[^"\s]+)$/);
      if (!m) continue;
      const [, key, rawValue] = m;
      if (["node", "edge", "graph", "graphics"].includes(key)) continue;
      let val: string | number = rawValue;
      if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
        val = rawValue.slice(1, -1);
      } else if (!isNaN(Number(rawValue))) {
        val = Number(rawValue);
      }
      props[key] = val;
    }

    if (type === "node" && props.id !== undefined) {
      nodes.push({ id: String(props.id), label: props.label || String(props.id), ...props });
    }
    if (type === "edge" && props.source && props.target) {
      links.push({ source: String(props.source), target: String(props.target), ...props });
    }
  }

  const nodeIds = new Set(nodes.map((n) => n.id));
  return { nodes, links: links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target)) };
}

/** ==============================
 * 🧠 主组件：支持自适应父容器尺寸
 * ============================== */
export function NetworkGraph({ fileUrl, showLabels = true }: GMLViewerProps) {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [ForceGraph, setForceGraph] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  // 1️⃣ 动态导入图组件
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-force-graph-2d")
        .then((mod) => setForceGraph(() => mod.default))
        .catch(() => setError("图形模块加载失败"));
    }
  }, []);

  // 2️⃣ 解析 GML 文件
  useEffect(() => {
    if (!fileUrl) return;
    fetch(fileUrl)
      .then((res) => res.text())
      .then((text) => setGraph(parseGML(text)))
      .catch((err) => setError(`加载失败：${err.message}`));
  }, [fileUrl]);

  // 3️⃣ 监听容器大小变化（自适应）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () =>
      setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!ForceGraph ? (
        <p className="text-sm text-muted-foreground">正在加载模块...</p>
      ) : graph ? (
        <ForceGraph
          graphData={graph}
          nodeLabel={showLabels ? "label" : ""}
          nodeAutoColorBy="id"
          linkDirectionalArrowLength={4}
          linkCurvature={0.2}
          width={dimensions.width}
          height={dimensions.height}
        />
      ) : (
        <p className="text-sm text-muted-foreground">正在加载图数据...</p>
      )}
    </div>
  );
}
