const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
