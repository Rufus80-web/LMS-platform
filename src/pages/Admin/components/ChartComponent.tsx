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
import { Box } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
const data = [
  { transportation: "plane", teacher: 500, student: 300, course: 100 },
  { transportation: "helicopter", teacher: 400, student: 280, course: 80 },
  { transportation: "boat", teacher: 420, student: 290, course: 60 },
  { transportation: "train", teacher: 380, student: 220, course: 200 },
  { transportation: "subway", teacher: 550, student: 450, course: 120 },
  { transportation: "bus", teacher: 570, student: 460, course: 300 },
  { transportation: "car", teacher: 430, student: 400, course: 280 },
  { transportation: "moto", teacher: 390, student: 370, course: 250 },
  { transportation: "bicycle", teacher: 500, student: 360, course: 0 },
  // { transportation: "horse", teacher: 300, student: 100, course: 20 },
  // { transportation: "skateboard", teacher: 350, student: 320, course: 10 },
  // { transportation: "others", teacher: 370, student: 280, course: 5 },
];
const ChartComponent = () => {
  const { themeMode } = useTheme()
  return (
    <Box sx={{ bgcolor: themeMode === 'light' ? "white" : 'transparent', color: "black", p: 0, borderRaditeacher: 2 }}>
      {/* <Typography variant="h4" gutterBottom>
        Graphical View of your classes
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "teal", mb: 3 }}>
        Class Competitions
      </Typography> */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="#ccc" /> {/** Removes stroke borders(grids) and color set to (3, 3) or any from (0,0) to see chnages */}
          <XAxis dataKey="transportation" stroke={themeMode === 'light' ? '#000' : '#d4d0d08c'} />
          <YAxis stroke={themeMode === 'light' ? '#000' : '#d4d0d08c'} />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey="teacher"
            stroke="#fcd34d"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="student"
            stroke="#f472b6"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="course"
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
