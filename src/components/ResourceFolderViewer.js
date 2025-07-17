import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResourceFolderViewer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get('url');
  const title = params.get('title') || 'Resource Folder';
  const [fileLinks, setFileLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper: Extract folder ID from Google Drive folder URL
  const getFolderId = (folderUrl) => {
    if (!folderUrl) return null;
    const match = folderUrl.match(/folders\/([\w-]+)/);
    return match ? match[1] : null;
  };

  // Fetch files in the folder using Google Drive API (public folders only)
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      setFileLinks([]);
      const folderId = getFolderId(url);
      if (!folderId) {
        setLoading(false);
        setError('Invalid folder URL');
        return;
      }
      try {
        // Use Google Drive API v3 (public folders only, no auth)
        const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id%2Cname%2CmimeType)&key=AIzaSyD-EXAMPLE-KEY`;
        // NOTE: Replace the API key above with your own Google API key with Drive API enabled
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch folder contents');
        const data = await res.json();
        setFileLinks(data.files || []);
      } catch (e) {
        setError('Unable to list files in this folder. You can still open the folder in Google Drive.');
      } finally {
        setLoading(false);
      }
    };
    if (url) fetchFiles();
  }, [url]);

  if (!url) {
    return <div style={{ padding: 32 }}>No folder URL provided.</div>;
  }

  return (
    <div className="container-ebook ebook-page">
      <h2>{title}</h2>
      <p>
        Google Drive folders cannot be previewed here. Click below to open the folder in Google Drive and access all files.<br/>
        <strong>The webapp will remain open in this tab.</strong>
      </p>
      <a
        href={url}
        className="card-button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} in Google Drive`}
        style={{ marginTop: 16, display: "inline-block" }}
      >
        Open in Google Drive
      </a>
      <div style={{ marginTop: 32 }}>
        <h3>Files in this folder (public files only):</h3>
        {loading && <div>Loading files...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && fileLinks.length === 0 && <div>No files found or folder is not public.</div>}
        <ul>
          {fileLinks.map(file => (
            <li key={file.id} style={{ marginBottom: 8 }}>
              {file.mimeType.startsWith('application/pdf') ? (
                <a
                  href={`/resource/view/${file.id}?title=${encodeURIComponent(file.name)}`}
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {file.name} (Preview)
                </a>
              ) : (
                <a
                  href={`https://drive.google.com/file/d/${file.id}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {file.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourceFolderViewer; 