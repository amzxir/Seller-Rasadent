import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function PirChart(props) {
  return (
    <Pie data={props.chartData} />
  )
}

export default PirChart;