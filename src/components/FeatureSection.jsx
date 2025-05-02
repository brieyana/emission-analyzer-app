import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
    const features = [
        { feature: "Real-time Prediction", description: "Accurately predicts CO and NOx emissions utilizing rated thrust, bypass ratio, and pressure ratio" },
        { feature: "Interactive Visualizations", description: "Generates interactive visuals to explore data relationships, such as emission level distributions" },
        { feature: "Side-by-Side Analysis", description: "Compare outputs and visualizations across multiple engines to analyze performance and emissions differences" },
    ];

    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 min-h-[300px]">
            {features.map((f, i) => (
                <FeatureCard
                    key={f.feature}
                    feature={f.feature}
                    description={f.description}
                    delay={i * 0.2}
                />
            ))}
        </div>
    );
}

export default FeatureSection;