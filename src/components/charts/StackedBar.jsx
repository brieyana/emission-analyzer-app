import { useMemo } from "react";
import Plot from "react-plotly.js";
import useAppStore from "../../store/AppStore";
import useUserStore from "../../store/UserStore";

const levels = ["Low", "Moderate", "High", "Very High"];
const colors = {
  Low: "green",
  Moderate: "yellow",
  High: "red",
  "Very High": "black",
};

const class_height = {
  Low: 1,
  Moderate: 2,
  High: 3,
  "Very High": 4,
};

const StackedBarChart = () => {
  const selectedEngineIds = useAppStore((state) => state.selectedEngineIds);
  const { emissions } = useUserStore();

  const traces = useMemo(() => {
    const tracesByLevel = levels.map((level) => ({
      name: level,
      x: [],
      y: [],
      customdata: [],
      type: "bar",
      marker: { color: colors[level] },
      hovertemplate:
        "%{x}<br>" +
        "Level: %{fullData.name}<br>" +
        "Confidence: %{customdata:.0%}<extra></extra>",
    }));
  
    selectedEngineIds.forEach((engineId) => {
      const prediction = emissions[engineId]?.predictions;
      if (!prediction) return;
  
      ["CO", "NOX"].forEach((pollutant) => {
        const label = `${engineId}-${pollutant}`;
        const pollutantData = prediction[pollutant];
  
        if (!pollutantData?.Class || !pollutantData?.Confidence) return;
  
        const totalHeight = class_height[pollutantData.Class] || 0;
        levels.forEach((level, index) => {
          const conf = pollutantData.Confidence[level] || 0;
          const height = conf * totalHeight;
          tracesByLevel[index].x.push(label);
          tracesByLevel[index].y.push(height);
          tracesByLevel[index].customdata.push(conf);
        });
      });
    });
  
    return tracesByLevel;
  }, [selectedEngineIds, emissions]);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="font-bold text-center text-xl mb-4">Stacked Emission Severity Chart</h3>
      <Plot
        data={traces}
        layout={{
          barmode: "stack",
          dragmode: false,
          xaxis: {
            tickangle: 0,
          },
          yaxis: {
            tickmode: "array",
            tickvals: [1, 2, 3, 4],
            ticktext: ["Low", "Moderate", "High", "Very High"],
            range: [0, 4],
          },
          legend: { orientation: "h" },
          margin: { t: 20, b: 80, l: 80, r: 20 },
          autosize: true,
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{
          responsive: true,
          displayModeBar: false,
        }}
      />
    </div>
  );
};

export default StackedBarChart;
