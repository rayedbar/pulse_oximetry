import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { format } from "date-fns";

const useStyles = makeStyles({
  plot: {
    height: "100%",
    width: "100%",
  },
});

const PulseOximetryPlot = ({ pulseOximetryData, pulseOximetryRange }) => {
  const classes = useStyles();
  const Plot = createPlotlyComponent(Plotly);

  const formattedDateTime = pulseOximetryData.map((data) =>
    format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")
  );

  const plotData = {
    spo2: {
      x: formattedDateTime,
      y: pulseOximetryData.map((data) => data.spo2),
      type: "scatter",
      mode: "lines+markers",
      name: "SpO2",
      marker: {
        color: "red",
        symbol: pulseOximetryData.map((data) =>
          data.spo2 >= pulseOximetryRange.minSpO2 ? "o" : "x"
        ),
        size: pulseOximetryData.map((data) =>
          data.spo2 >= pulseOximetryRange.minSpO2 ? 8 : 12
        ),
      },
      xaxis: "x",
    },
    heartRate: {
      x: formattedDateTime,
      y: pulseOximetryData.map((data) => data.heartRate),
      type: "scatter",
      mode: "lines+markers",
      name: "Heart Rate",
      marker: {
        color: "#0070cc",
        symbol: pulseOximetryData.map((data) =>
          data.heartRate <= pulseOximetryRange.maxHeartRate &&
          data.heartRate >= pulseOximetryRange.minHeartRate
            ? "o"
            : "x"
        ),
        size: pulseOximetryData.map((data) =>
          data.heartRate <= pulseOximetryRange.maxHeartRate &&
          data.heartRate >= pulseOximetryRange.minHeartRate
            ? 8
            : 12
        ),
      },
      xaxis: "x",
      yaxis: "y2",
    },
  };

  const plotlyConfig = {
    displaylogo: false,
    modeBarButtonsToRemove: ["sendDataToCloud", "toggleSpikelines", "lasso2d"],
  };

  return (
    <Plot
      className={classes.plot}
      useResizeHandler={true}
      data={[plotData.spo2, plotData.heartRate]}
      layout={{
        grid: { rows: 2, columns: 1 },
        title: "SpO2 and Heart Rate Plot",
        xaxis: {
          autorange: true,
          rangeslider: {},
        },
        autosize: true,
        margin: {
          b: 30,
        },
        legend: {
          x: 1,
          xanchor: "right",
          y: 1.2,
        },
        yaxis: { domain: [0.6, 1] },
        yaxis2: { domain: [0, 0.45] },
      }}
      config={plotlyConfig}
    />
  );
};

export default PulseOximetryPlot;
