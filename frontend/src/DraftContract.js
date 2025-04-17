import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './draftcontract.css';
import logo from './Logo_EoYCW.png';

function DraftContract() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contractText, setContractText] = useState('');

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent().getPlainText();
    setContractText(content);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(contractText, 10, 10);
    doc.save('contract.pdf');
  };

  const exportToDOCX = () => {
    const doc = new Document({
      creator: "DraftContract App",
      title: "Generated Contract",
      description: "Exported contract from Draft.js",
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(contractText)],
            }),
          ],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "contract.docx");
    });
  };
  

  return (
    <div className="draft-page">
      <header className="top-bar">
        <div className="logo">
          <img src={logo} alt ="Sample Logo" />
        </div>

        <nav className="nav-links">
          <a href="/freelance-dash">Dashboard</a>
        </nav>
      </header>

      <main className="draft-container">
        <h2 className="draft-title">Draft Contract</h2>
        <div className="editor-wrapper">
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            placeholder="Write your contract here..."
          />
        </div>
        <div className="button-row">
          <button className="export-btn" onClick={exportToPDF}>Export as PDF</button>
          <button className="export-btn" onClick={exportToDOCX}>Export as DOCX</button>
        </div>
      </main>
    </div>
  );
}

export default DraftContract;
