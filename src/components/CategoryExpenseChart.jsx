import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563EB", // primary
  "#16A34A", // income
  "#DC2626", // expense
  "#F59E0B", // warning
  "#9333EA",
  "#0EA5E9",
];

const CategoryExpenseChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400">
        No expense data available.
      </p>
    );
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryExpenseChart;
