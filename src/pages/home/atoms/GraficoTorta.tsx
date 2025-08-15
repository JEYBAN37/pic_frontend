import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registramos los componentes y el plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
 count: readonly number[];
 labelsDona?: readonly string[];
  backgroundColor?: string[];
}

export default function GraficoTorta({ count, labelsDona, backgroundColor }: Readonly<Props>) {
  const labels = labelsDona && labelsDona.length > 0
    ? labelsDona
    : ["Niños", "Adultos", "Mayores"];

  const total = count.reduce((acc, val) => acc + val, 0);

  const data = {
    labels: [...labels],
    datasets: [
      {
        data: count,
        backgroundColor: backgroundColor || ["#d8eaff", "#b9daff", "#89c4ff", "#2a7dff", "#155DFD", "#0039CB"],
        borderWidth: 10,
        borderColor: "#fff",
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false // Ocultamos la leyenda dentro del chart
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 10
        },
        formatter: (value: number) => {
          const porcentaje = ((value / total) * 100).toFixed(1);
          return `${porcentaje}%`;
        }
      }
    },
    maintainAspectRatio: false,
    onHover: (event: any) => {
      event.native.target.style.cursor = "pointer";
    }
  };

  return (
    <div className="flex w-full h-full flex-col 2xl:flex-row items-center justify-end 2xl:justify-start">
      {/* Leyenda manual */}
      <div className="flex justify-center flex-wrap 2xl:flex-col text-xs text-gray-800 p-4 2xl:p-9">
        {labels.map((label, i) => (
          <div key={i} className="flex p-1 items-center">
            <span
              className="w-4 h-4 rounded mr-2"
              style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="absolute bottom-6 w-[200px] h-full flex 2xl:right-20 2xl:top-2 2xl:w-[220px]">
        <Pie data={data} options={options}/>
      </div>
    </div>
  );
}
