import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function goToPrevPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  const options = {
    disableAutoFetch: true,
  };

  return (
	<div>
		<div>
			<input type="file" onChange={onFileChange} />
		</div>
		<button onClick={goToPrevPage} disabled={pageNumber <= 1}>
			Prev
		</button>
		<button onClick={goToNextPage} disabled={pageNumber >= numPages}>
			Next
		</button>
		<div>
			{file && (
			<p>
				Page {pageNumber} of {numPages}
			</p>
			)}
		</div>
		<div>
			{file && (
				<Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
					<Page pageNumber={pageNumber} />
				</Document>
			)}
		</div>      
	</div>
  );
}

export default PdfViewer;
