/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import useUserStore from "../../store/UserStore";
import useAppStore from "../../store/AppStore";

const RadarChart = ({ engineId }) => {
  const { emissions } = useUserStore();
  const { compareClicked } = useAppStore();
  const predictions = emissions[engineId]?.predictions;
  const plotRef = useRef(null);

  useEffect(() => {
    if (plotRef.current) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [engineId]);
  if (!predictions) {
    return (
      <div className="p-4 rounded-2xl shadow-lg bg-white w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Loading Predictions...</h2>
      </div>
    );
  }

  const levels = ["Low", "Very High", "High", "Moderate"];

  const formatTrace = (label, color) => {
    const confidences = levels.map(level => predictions[label]?.Confidence[level] || 0);
    confidences.push(confidences[0]);
    const labels = [...levels, levels[0]];

    return {
      type: "scatterpolar",
      r: confidences,
      theta: labels,
      hoveron: "points",
      fill: "toself",
      name: label,
      line: { color }
    };
  };

  const data = [
    formatTrace("CO", "blue"),
    formatTrace("NOX", "red")
  ];

  const layout = {
    autosize: true,
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1]
      }
    },
    showlegend: true,
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.2,
      xanchor: "center",
      x: 0.5
    },
    margin: { t: 30, b: 50, l: 30, r: 30 },
    dragmode: "pan",
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="font-[Source_Sans_3] mb-[10px] text-center font-semibold">
        {compareClicked ? engineId : "Predicted Emission Level Distribution"}
      </h3>

      <Plot
        data={data}
        layout={layout}
        config={{ 
          responsive: true,
          displayModeBar: false,
          scrollZoom: false,
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        ref={plotRef}
      />
    </div>
  );
};

export default RadarChart;
