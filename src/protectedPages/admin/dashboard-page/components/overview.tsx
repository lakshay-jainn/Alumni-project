
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    alumni: 45,
    students: 32,
  },
  {
    name: "Feb",
    alumni: 38,
    students: 28,
  },
  {
    name: "Mar",
    alumni: 52,
    students: 41,
  },
  {
    name: "Apr",
    alumni: 63,
    students: 47,
  },
  {
    name: "May",
    alumni: 71,
    students: 53,
  },
  {
    name: "Jun",
    alumni: 84,
    students: 65,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="alumni" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="students" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

