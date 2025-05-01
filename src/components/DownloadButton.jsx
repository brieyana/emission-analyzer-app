import useUserStore from "../store/UserStore";
import icon from "../assets/images/download.png";
import useAppStore from "../store/AppStore";

const DownloadButton = () => {
  const { emissions } = useUserStore();
  const {
    setError,
    setMessage
  } = useAppStore();

  const handleDownload = () => {
    if (Object.keys(emissions).length === 0) {
      setError(true);
      setMessage("No prediction data available")
    }  else {
      const json = JSON.stringify(emissions, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'emission_predictions.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="relative group inline-block">
      <button onClick={handleDownload}>
        <img src={icon} alt="Download Icon" />
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Download Predictions
      </div>
    </div>
  );
}

export default DownloadButton;