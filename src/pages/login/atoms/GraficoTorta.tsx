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
  readonly countPoblaciones: readonly number[];
  readonly labelsDona?: readonly string[];
}

export default function GraficoTorta({ countPoblaciones, labelsDona }: Props) {
  const labels = labelsDona && labelsDona.length > 0
    ? labelsDona
    : ["Niños", "Adultos", "Mayores"];

  const total = countPoblaciones.reduce((acc, val) => acc + val, 0);

  const data = {
    labels: [...labels],
    datasets: [
      {
        data: countPoblaciones,
        backgroundColor: [ "#d8eaff", "#b9daff", "#89c4ff", "#2a7dff","#155DFD", "#0039CB"],
        borderWidth: 2,
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
    <div className="basis-1/2 flex w-full h-[250px] bg-white  rounded-2xl items-center justify-center my-4">
      {/* Leyenda manual */}
      <div className="flex w-[40%] ml-5 2xl:ml-10 flex-col justify-center text-sm text-gray-700">
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
      <div className="flex w-[60%] 2xl:w-[90%]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
