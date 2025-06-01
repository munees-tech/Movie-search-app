/**
 * Loading Spinner Component
 * Displays a centered animated spinner and a loading message.
 * @returns {JSX.Element}
 */
const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg"></div>
        <p className="text-xl font-semibold tracking-wide text-cyan-300">Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;