import Chart from "react-apexcharts";

export const Mecaps = () => {
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
        colors: ["#66CCFF", "#003366"],
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
    
      const chartSeries = [4, 67];
  return (
    <div>
        <h1 className="text-center mb-2">Mecaps</h1>
      <Chart options={chartOptions} series={chartSeries} type="donut" />
    </div>
  );
}
