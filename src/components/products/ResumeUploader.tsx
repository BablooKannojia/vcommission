import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ResumeUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setPageNumber(1);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-xl font-bold mb-4">Resume Upload</h2>
      
      <div className="flex flex-col items-center mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="application/pdf"
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
        >
          {file ? 'Change Resume' : 'Upload Resume'}
        </button>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {file && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Preview</h3>
            {numPages && (
              <p className="text-sm text-gray-500">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>
          
          <div className="flex justify-center border rounded bg-gray-50">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="p-4">Loading PDF...</div>}
              error={<div className="p-4 text-red-500">Failed to load PDF</div>}
            >
              <Page 
                pageNumber={pageNumber} 
                width={600}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>

          {numPages && numPages > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;