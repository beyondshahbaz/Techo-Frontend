import Chart from "react-apexcharts";

export const LGS = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
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

  const chartSeries = [3, 35];

  return (
    <div>
        <h1 className="text-center mb-2">LGS</h1>
      <Chart options={chartOptions} series={chartSeries} type="donut" />
    </div>
  );
};
