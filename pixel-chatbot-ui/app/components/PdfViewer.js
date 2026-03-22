const PdfViewer = ({ url }) => {
  return (
    <div className="w-full mt-3 border rounded-lg overflow-hidden shadow-sm bg-gray-50">
      <div className="bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 flex justify-between items-center">
        <span>📄 PDF Preview</span>
        <a href={url.replace('/preview', '/view')} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          Full Screen
        </a>
      </div>
      <iframe
        src={url}
        width="100%"
        height="450px"
        allow="autoplay"
        className="border-none"
      />
    </div>
  );
};