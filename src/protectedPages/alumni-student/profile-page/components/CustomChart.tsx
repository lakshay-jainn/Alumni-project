
import { Pie, PieChart } from "recharts"

const chartData = [
  { browser: "chrome", visitors: 10, fill: "#DCEEFC" },
  { browser: "safari", visitors: 20, fill: "#0072E5" },
]

export function ChartComponent() {
  return (
  
   

          <PieChart width={150} height={150} className="mx-auto rotate-90 p-0">
            {/* <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} /> */}
            <Pie className="p-0" data={chartData} dataKey="visitors" nameKey="browser" />
          </PieChart>
 

  )
}
