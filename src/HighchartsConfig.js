export default function HighchartsConfig(historicalArray) {
  return {
    title: {
      text: "",
    },
    chart: {
      height: "400px",
    },
    subtitle: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Price",
      },
    },
    xAxis: { type: "datetime" },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: historicalArray,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
}
