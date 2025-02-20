import Chart from "react-apexcharts";

export const AllSaints = () => {
  const chartOptions = {
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
    labels: ["Batches", "Students"],
    colors: ["#ffc600", "#05a6f0"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [1, 21];
  return (
    <div>
      <div>
        <h1 className="text-center mb-2">All Saints</h1>
        <Chart options={chartOptions} series={chartSeries} type="donut" />
      </div>
    </div>
  );
};
