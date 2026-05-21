import "./App.css";
import { useState } from "react";
import { UploadCloud, FileText, Download, Sparkles } from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [newFileName, setNewFileName] = useState("");

  const documentOptions = [
    "Passport",
    "PAN Card",
    "Aadhar",
    "10th Certificate",
    "12th Certificate",
    "Degree Certificate",
    "Semester Marksheets",
    "Admission Letter",
    "Salary Slip",
    "Bank Statement",
    "GRE Score Card",
    "IELTS Score Card",
    "TOEFL Score Card",
    "GMAT Score Card",
    "PTE Score Card",
    "Duolingo Score Card",
    "Resume",
    "ITR",
    "Form 16",
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = () => {
    if (!file || !studentName || !documentType) {
      alert("Please fill all fields");
      return;
    }

    const extension = file.name.split(".").pop();

    const formattedName = `${documentType}(${studentName}).${extension}`;

    const renamedFile = new File([file], formattedName, {
      type: file.type,
    });

    const url = URL.createObjectURL(renamedFile);

    setDownloadUrl(url);
    setNewFileName(formattedName);
  };

  return (
    <div className="app">
      <div className="background-glow"></div>

      <div className="container">
        <div className="badge">
          <Sparkles size={15} />
          AI Smart Renamer
        </div>

        <h1>
          Rename Student Documents
          <span> Professionally</span>
        </h1>

        <p className="subtitle">
          Upload files and instantly generate clean, consultancy-ready
          filenames.
        </p>

        <label className="upload-box">
          <input type="file" hidden onChange={handleFileChange} />

          <UploadCloud size={60} />

          <h3>Upload Documents</h3>

          <p>PDF, DOCX, Images or any file format</p>
        </label>

        {file && (
          <div className="file-card">
            <FileText size={22} />

            <div>
              <small>Uploaded File</small>
              <h4>{file.name}</h4>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Document Type</label>

          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document</option>

            {documentOptions.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Student Name</label>

          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <button className="generate-btn" onClick={handleGenerate}>
          Generate Filename
        </button>

        {downloadUrl && (
          <div className="result-box">
            <p className="generated-label">Generated Filename</p>

            <div className="generated-file">{newFileName}</div>

            <a
              href={downloadUrl}
              download={newFileName}
              className="download-btn"
            >
              <Download size={18} />
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
