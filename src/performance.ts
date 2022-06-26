// export interface PerformanceChartData

export const createPerformanceChartData = (
  axis: number,
  pattern: number,
  normalization: number
) => ({
  labels: ["Generation Performance (in ms)"],
  datasets: [
    {
      label: "axis",
      backgroundColor: "#ff0000",
      data: [axis],
    },
    {
      label: "pattern",
      backgroundColor: "#00ff00",
      data: [pattern],
    },
    {
      label: "normalization",
      backgroundColor: "#0000ff",
      data: [normalization],
    },
  ],
});

export const performanceOptions = {
  indexAxis: "y",
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    tooltips: {
      mode: "index",
      intersect: false,
    },
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
};
