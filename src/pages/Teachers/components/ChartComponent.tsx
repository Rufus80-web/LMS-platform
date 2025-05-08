import {} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box } from "@mui/material";
const data = [
  { transportation: "plane", us: 500, france: 300, japan: 100 },
  { transportation: "helicopter", us: 400, france: 280, japan: 80 },
  { transportation: "boat", us: 420, france: 290, japan: 60 },
  { transportation: "train", us: 380, france: 220, japan: 200 },
  { transportation: "subway", us: 550, france: 450, japan: 120 },
  { transportation: "bus", us: 570, france: 460, japan: 300 },
  { transportation: "car", us: 430, france: 400, japan: 280 },
  { transportation: "moto", us: 390, france: 370, japan: 250 },
  { transportation: "bicycle", us: 500, france: 360, japan: 0 },
  { transportation: "horse", us: 300, france: 100, japan: 20 },
  { transportation: "skateboard", us: 350, france: 320, japan: 10 },
  { transportation: "others", us: 370, france: 280, japan: 5 },
];
const ChartComponent = () => {
  return (
    <Box sx={{ bgcolor: "white", color: "black", p: 0, borderRadius: 2 }}>
      {/* <Typography variant="h4" gutterBottom>
        Graphical View of your classes
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "teal", mb: 3 }}>
        Class Competitions
      </Typography> */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="#ccc" /> {/** Removes stroke borders(grids) and color set to (3, 3) or any from (0,0) to see chnages */}
          <XAxis dataKey="transportation" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey="us"
            stroke="#fcd34d"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="france"
            stroke="#f472b6"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="japan"
            stroke="#60a5fa"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default ChartComponent;
