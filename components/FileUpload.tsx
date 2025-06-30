"use client";
import React, { useCallback, useState } from "react";
import { UploadCloud as CloudUpload, X, FileText } from "lucide-react";
import { GameLogFile } from "../types";

interface FileUploadProps {
  onFileSelect: (file: GameLogFile) => void;
  isAnalyzing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isAnalyzing,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<GameLogFile | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
          const gameLogFile: GameLogFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
          };
          setSelectedFile(gameLogFile);
          onFileSelect(gameLogFile);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
          const gameLogFile: GameLogFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
          };
          setSelectedFile(gameLogFile);
          onFileSelect(gameLogFile);
        }
      }
    },
    [onFileSelect]
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (selectedFile && !isAnalyzing) {
    return (
      <div className="bg-background rounded-lg shadow-card p-8 mb-8">
        <h2 className="text-xl font-inter font-semibold text-primary mb-6">
          Selected File
        </h2>
        <div className="flex items-center justify-between p-4 bg-background rounded border">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-teal mr-3" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm">
                {formatFileSize(selectedFile.size)} •{" "}
                {selectedFile.type || "CSV"}
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Remove file"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-card mb-8">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors 
          ${
            dragActive
              ? "border-teal bg-background/50"
              : "border-border bg-card hover:bg-card-foreground/10"
          } hover:bg-card-foreground`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload CSV file"
          disabled={isAnalyzing}
        />
        <CloudUpload
          className={`w-12 h-12 mx-auto mb-4 ${
            dragActive ? "text-teal" : "text-gray-400"
          }`}
        />
        <p className="text-lg font-medium mb-2">
          Drag & drop your (CSV) log file or click to browse
        </p>
        <p className="text-sm">(Max Size: 10MB)</p>
      </div>
    </div>
  );
};

export default FileUpload;
