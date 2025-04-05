
import React from 'react';
import {
  Bar,
  Line,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  data: any[];
  height?: number | string;
  xAxisKey?: string; // Added to support the xAxisKey prop
  showLegend?: boolean; // Added to support showing/hiding legend
  series?: { dataKey: string; label: string; color: string }[]; // Added for custom series config
}

export const BarChart = ({ 
  data, 
  height = 300, 
  xAxisKey = "name", 
  showLegend = true,
  series = [{ dataKey: "value", label: "Value", color: "hsl(var(--primary))" }]
}: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {series.map((s, index) => (
          <Bar key={index} dataKey={s.dataKey} fill={s.color} name={s.label} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const LineChart = ({ 
  data, 
  height = 300,
  xAxisKey = "name",
  showLegend = true,
  series = [{ dataKey: "value", label: "Value", color: "hsl(var(--primary))" }]
}: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {series.map((s, index) => (
          <Line 
            key={index} 
            type="monotone" 
            dataKey={s.dataKey} 
            stroke={s.color} 
            name={s.label}
            activeDot={{ r: 8 }} 
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
