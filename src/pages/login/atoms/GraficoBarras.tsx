import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registramos componentes y plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  readonly countGeneros: readonly number[];
  readonly labels?: readonly string[];
}

export default function GraficoBarras({ countGeneros, labels }: Props) {
  const labelsBar = labels && labels.length > 0
    ? labels
    : ["Niños", "Adultos", "Mayores"];

  const total = countGeneros.reduce((acc, val) => acc + val, 0);

  const data = {
    labels: [...labelsBar],
    datasets: [
      {
        label: "Cantidad",
        data: countGeneros,
        backgroundColor: ["#e8f3d4", "#d3e8ae", "#b5d87e"],
        borderWidth: 1,
        borderColor: "#fff",
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: "#333",
        anchor: "end" as const,
        align: "top" as const,
        font: {
          weight: "bold" as const,
          size: 12
        },
        formatter: (value: number) => {
          const porcentaje = ((value / total) * 100).toFixed(1);
          return `${porcentaje}%`;
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    onHover: (event: any) => {
      event.native.target.style.cursor = "pointer";
    }
  };

  return (
    <div className="basis-1/2 flex w-full h-[250px] bg-white  rounded-2xl items-center justify-center">

      <div className="flex w-[90%] h-[100%]">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}
