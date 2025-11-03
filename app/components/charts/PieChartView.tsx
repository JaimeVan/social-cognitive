import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "主题A", value: 40 },
  { name: "主题B", value: 25 },
  { name: "主题C", value: 20 },
  { name: "主题D", value: 15 },
];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export function PieChartView() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}