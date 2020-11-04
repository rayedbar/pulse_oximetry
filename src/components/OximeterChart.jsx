import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { format } from "date-fns";

const useStyles = makeStyles({
  plot: {
    height: "100%",
    width: "100%",
    marginTop: 20,
  },
});

const OximeterChart = ({ spo2Data }) => {
  const classes = useStyles();
  const Plot = createPlotlyComponent(Plotly);

  const plotData = {
    spo2: {
      x: spo2Data.map((data) =>
        format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")
      ),
      y: spo2Data.map((data) => data.spo2),
      type: "scatter",
      mode: "lines+markers",
      name: "Spo2",
      marker: { color: "red" },
    },
    heartRate: {
      x: spo2Data.map((data) =>
        format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")
      ),
      y: spo2Data.map((data) => data.heartRate),
      type: "scatter",
      mode: "lines+markers",
      name: "Heart rate",
      marker: { color: "blue" },
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
        title: "SpO2 and Heart Rate Plot",
        xaxis: {
          autorange: true,
          rangeslider: {},
        },
        autosize: true,
      }}
      config={plotlyConfig}
    />
  );
};

export default OximeterChart;
