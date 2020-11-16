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

const PulseOximetryPlot = ({ pulseOximetryData }) => {
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
        symbol: pulseOximetryData.map((data) => (data.spo2 > 95 ? "." : "x")),
        size: pulseOximetryData.map((data) => (data.spo2 > 95 ? 8 : 12)),
      },
      xaxis: "x",
      line: { shape: "spline" },
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
          data.heartRate <= 100 && data.heartRate >= 60 ? "." : "x"
        ),
        size: pulseOximetryData.map((data) =>
          data.heartRate <= 100 && data.heartRate >= 60 ? 8 : 12
        ),
      },
      xaxis: "x",
      yaxis: "y2",
      line: { shape: "spline" },
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
          b: 20,
        },
      }}
      config={plotlyConfig}
    />
  );
};

export default PulseOximetryPlot;
