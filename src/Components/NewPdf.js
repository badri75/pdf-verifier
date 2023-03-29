// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import React, {useState} from "react";

// import { Viewer, Worker } from '@react-pdf-viewer/core'
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// // import '@react-pdf-viewer/defualt-layout/lib/styles/index.css'

// function NewPdf() {      
//     const [pdfFile, setPDFFile] = useState(null)
// 	const [viewPdf, setViewPdf] = useState(null)

//     const fileType = ['application/pdf']
//     const handleChange = (e) => {
//         let selectedFile = e.target.files[0]
//         if(selectedFile) {
//             if(selectedFile && fileType.includes(selectedFile.type)) {
//                 let reader = new FileReader()
//                 reader.readAsDataURL(selectedFile)
//                 reader.onload = (e) => {
//                     setPDFFile(e.target.result)
//                 }
//             }
//             else{
//                 setPDFFile(null)
//             }
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if(pdfFile != null) {
//             setViewPdf(pdfFile)
//         }
//         else {
//             setViewPdf(null)
//         }
//     }

//     const newplugin = defaultLayoutPlugin()

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type='file' className='form-control' onChange={handleChange}/>
//                 <button type='submit' className='btn btn-success'>View Pdf</button>
//             </form>
//             <div className='pdf-container'>
//                 <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
//                     {viewPdf && <>
//                         <Viewer fileUrl={viewPdf} plugins={[newplugin]}/>
//                     </>}
//                     {!viewPdf && <> No PDF </>}
//                 </Worker>
//             </div>
//         </div>
//     )
// }

// export default NewPdf

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Highlight, AreaHighlight, Popup } from 'react-pdf-highlighter';
import ContentEditable from 'react-contenteditable';
import { MdHighlight, MdNoteAdd } from 'react-icons/md';

function PDFViewer({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [annotations, setAnnotations] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleHighlight(position, content) {
    setHighlights([
      ...highlights,
      { position, content }
    ]);
  }

  function handleAnnotation(position, content) {
    setAnnotations([
      ...annotations,
      { position, content }
    ]);
  }

  return (
    <div>
      <div className="pdf-controls">
        <button onClick={() => setHighlights([])}>
          Clear Highlights
        </button>
        <button onClick={() => setAnnotations([])}>
          Clear Annotations
        </button>
      </div>

      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1}>
            <HighlightContainer highlights={highlights} />
            <AnnotationContainer annotations={annotations} />

            <Popup
              // custom popup to display highlight and annotation form
            >
              {({ selection }) => (
                <div>
                  <HighlightButton
                    onClick={() => handleHighlight(selection, "")}
                  />
                  <AnnotationButton
                    onClick={() => handleAnnotation(selection, "")}
                  />
                </div>
              )}
            </Popup>
          </Page>
        ))}
      </Document>
    </div>
  );
}

function HighlightContainer({ highlights }) {
  return (
    <div>
      {highlights.map((highlight, index) => (
        <Highlight
          key={`highlight_${index}`}
          {...highlight.position}
          comment={highlight.content}
          isScrolledTo={false}
        >
          <ContentEditable html={highlight.content} />
        </Highlight>
      ))}
    </div>
  );
}

function AnnotationContainer({ annotations }) {
  return (
    <div>
      {annotations.map((annotation, index) => (
        <AreaHighlight
          key={`annotation_${index}`}
          {...annotation.position}
          comment={annotation.content}
          isScrolledTo={false}
        >
          <ContentEditable html={annotation.content} />
        </AreaHighlight>
      ))}
    </div>
  );
}

function HighlightButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <MdHighlight />
      Highlight
    </button>
  );
}

function AnnotationButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <MdNoteAdd />
      Add Note
    </button>
  );
}

export default PDFViewer