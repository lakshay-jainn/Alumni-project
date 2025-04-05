
import { Pie, PieChart } from "recharts"


export function ChartComponent({percentage}: { percentage: (string | null | undefined) }) {
  const percentageValue = percentage ? parseInt(percentage.replace("%", "")) : 0;
  const chartData = [
    { browser: "chrome", visitors: 100 - percentageValue, fill: "#DCEEFC" },
    { browser: "safari", visitors:percentageValue, fill: "#95323d" },
  ]
  return (
  
   

          <PieChart width={150} height={150} className="mx-auto rotate-90 p-0">
            {/* <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} /> */}
            <Pie className="p-0" data={chartData} dataKey="visitors" nameKey="browser" />
          </PieChart>
 

  )
}
