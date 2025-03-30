import React from "react";
import ReactECharts from "echarts-for-react";

const IntercroppingSuggestions = () => {
  // Simulated time-series data for soil parameters with zig-zag patterns
  const timeLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const soilData = {
    nitrogen: [50, 55, 52, 58, 54], // Nitrogen levels in kg/ha
    phosphorus: [30, 32, 29, 35, 33], // Phosphorus levels in kg/ha
    potassium: [100, 105, 102, 110, 108], // Potassium levels in kg/ha
    pH: [6.2, 6.3, 6.1, 6.4, 6.2], // pH levels (neutral to slightly acidic)
    moisture: [40, 45, 42, 50, 48], // Moisture levels as a percentage
  };

  // Function to create chart options for each parameter
  const createChartOptions = (title, data, color) => ({
    title: {
      text: title,
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timeLabels,
      axisLine: {
        lineStyle: {
          color: "#aaa",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#aaa",
        },
      },
    },
    series: [
      {
        data: data,
        type: "line",
        smooth: true,
        lineStyle: {
          color: color,
          width: 4,
        },
        itemStyle: {
          color: color,
        },
        areaStyle: {
          color: `${color}33`, // Transparent fill
        },
      },
    ],
  });

  return (
    <div className="intercropping-suggestions">

      {/* Individual Graphs */}
      <div style={{ marginTop: "20px" }}>
        <h3>Nitrogen Level</h3>
        <ReactECharts
          option={createChartOptions(
            "Nitrogen Level",
            soilData.nitrogen,
            "#4caf50"
          )}
          style={{ height: "400px", width: "100%" }}
        />

        <h3>Phosphorus Level</h3>
        <ReactECharts
          option={createChartOptions(
            "Phosphorus Level",
            soilData.phosphorus,
            "#ff9800"
          )}
          style={{ height: "400px", width: "100%" }}
        />

        <h3>Potassium Level</h3>
        <ReactECharts
          option={createChartOptions(
            "Potassium Level",
            soilData.potassium,
            "#ffc107"
          )}
          style={{ height: "400px", width: "100%" }}
        />

        <h3>pH Level</h3>
        <ReactECharts
          option={createChartOptions("pH Level", soilData.pH, "#2196f3")}
          style={{ height: "400px", width: "100%" }}
        />

        <h3>Moisture Level</h3>
        <ReactECharts
          option={createChartOptions(
            "Moisture Level",
            soilData.moisture,
            "#9c27b0"
          )}
          style={{ height: "400px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default IntercroppingSuggestions;