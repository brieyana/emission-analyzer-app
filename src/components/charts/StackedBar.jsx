import { useMemo } from "react";
import Plot from "react-plotly.js";
import useAppStore from "../../store/AppStore";
import useUserStore from "../../store/UserStore";

const levels = ["Low", "Moderate", "High", "Very High"];
const colors = {
  Low: "#DDDBDE",
  Moderate: "#CAD4DF",
  High: "#656E77",
  "Very High": "#3B373B",
};

const bounds = {
  CO: {
    Low: [0, 25],
    Moderate: [25, 60],
    High: [60, 90],
    "Very High": [90, 150],
  },
  NOX: {
    Low: [0, 25],
    Moderate: [25, 50],
    High: [50, 75],
    "Very High": [75, 150],
  },
};

const StackedBarChart = () => {
  const selectedEngineIds = useAppStore((state) => state.selectedEngineIds);
  const { emissions } = useUserStore();
  const { engines } = useUserStore();
  const { compareClicked } = useAppStore();

  const traces = useMemo(() => {
    const tracesByLevel = levels.map((level) => ({
      name: level,
      x: [],
      y: [],
      customdata: [],
      type: "bar",
    marker: {
      color: colors[level],
      opacity: 0.8,
      line: {
        color: "rgba(0, 0, 0, 0.25)",
        width: 2,
        },
      },
      hovertemplate:
        "%{x}<br>" +
        "Level: %{fullData.name}<br>" +
        "Emissions: %{customdata[0]}g<br>" +
        "Confidence: %{customdata[1]:.0%}<extra></extra>",
      }));
  
    
    selectedEngineIds.forEach((engineId) => {
      const prediction = emissions[engineId]?.predictions;
      const engine = engines.find((e) => e.engine_identification === engineId);
      const ratedThrust = engine?.rated_thrust;
  
      if (!prediction || !ratedThrust) return;
  
      ["CO", "NOX"].forEach((pollutant) => {
        const label = `${engineId}-${pollutant}`;
        const pollutantData = prediction[pollutant];
        
        if (!pollutantData?.Confidence) return;
        levels.forEach((level, index) => {
          const conf = pollutantData.Confidence[level] || 0;
          const [lower, upper] = bounds[pollutant][level];
          const avgBound = (upper + lower) / 2;
          const emissionsInGrams = avgBound * conf * ratedThrust;
  
          if (emissionsInGrams > 0) {
            tracesByLevel[index].x.push(label);
            tracesByLevel[index].y.push(emissionsInGrams);
            tracesByLevel[index].customdata.push([emissionsInGrams.toFixed(2), conf]);
          }
        });
      });
    });
  
    return tracesByLevel;
  }, [selectedEngineIds, emissions, engines]);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="font-[Source_Sans_3] mb-[10px] text-center font-semibold">
        {compareClicked ? `` : "Predicted Absolute Emission Levels"}
      </h3>
      <Plot
        data={traces}
        layout={{
          barmode: "stack",
          dragmode: false,
          xaxis: {
            tickangle: 0,
          },
          yaxis: {
            title: {
              text: "Emissions (grams)",
              font: {
                size: 14,
              },
              standoff: 20,
            },
            rangemode: "tozero",
            tickformat: ",d",          
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
