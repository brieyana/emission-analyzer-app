import { useEffect } from "react";
import Plot from "react-plotly.js";
import useUserStore from "../../store/UserStore"; // adjust path if needed

const RadarChart = ({ engineId }) => {
  const { emissions } = useUserStore();
  const predictions = emissions[engineId];

  useEffect(() => {
    console.log("Predictions for engineId:", engineId, predictions);
    if (predictions) {
      console.log("CO prediction object:", predictions.CO);
      console.log("NOX prediction object:", predictions.NOX);

      console.log("CO Confidence raw:", predictions.CO?.Confidence);
      console.log("NOX Confidence raw:", predictions.NOX?.Confidence);

      console.log("Type of CO Confidence:", typeof predictions.CO?.Confidence);
      console.log("Type of NOX Confidence:", typeof predictions.NOX?.Confidence);
    }
  }, [engineId, predictions]);

  
  if (!predictions) {
    return (
      <div className="p-4 rounded-2xl shadow-lg bg-white w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Loading Predictions...</h2>
      </div>
    );
  }

  const levels = ["Low", "Moderate", "High", "Very High"];

  const formatTrace = (label, color) => {
    const confidences = levels.map(level => predictions[label]?.Confidence[level] || 0);
    confidences.push(confidences[0]);
    const labels = [...levels, levels[0]];

    return {
      type: "scatterpolar",
      r: confidences,
      theta: labels,
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
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1]
      }
    },
    showlegend: true,
    margin: { t: 30, b: 30, l: 30, r: 30 }
  };

  return (
    <div className="content-center">
      <h2 className="text-xl font-bold mb-4 text-center">Confidence Radar Chart</h2>
      <Plot data={data} layout={layout} config={{ responsive: true }} />
    </div>
  );
};

export default RadarChart;
