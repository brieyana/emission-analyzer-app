import useUserStore from "../store/UserStore";

export const populateEmissionTraces = (engineId, pollutant) => {
  const { engines, emissions } = useUserStore.getState();

  const levels = ["Low", "Moderate", "High", "Very High"];
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

  const prediction = emissions[engineId]?.predictions;
  const engine = engines.find((e) => e.engine_identification === engineId);
  const ratedThrust = engine?.rated_thrust;

  if (!prediction || !ratedThrust) return;

  const pollutantData = prediction[pollutant];
  if (!pollutantData?.Confidence) return;

  const emissionsByLevel = {};

  levels.forEach((level) => {
    const conf = pollutantData.Confidence[level] || 0;
    const [lower, upper] = bounds[pollutant][level];
    const avgBound = (upper + lower) / 2;
    const emissionsInGrams = avgBound * conf * ratedThrust;

    emissionsByLevel[level] = {
      confidence: conf,
      emissions: emissionsInGrams,
    };
  });

  return emissionsByLevel;
};

  