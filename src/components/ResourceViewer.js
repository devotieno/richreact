import { useParams, useLocation } from "react-router-dom";

const ResourceViewer = () => {
  const { fileId } = useParams();
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("title") || "Resource";

  return (
    <div className="container-ebook ebook-page">
      <h2>{title}</h2>
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        width="100%"
        height="800"
        allow="autoplay"
        title={title}
        frameBorder="0"
        style={{ borderRadius: 8 }}
      ></iframe>
      <a
        href={`https://drive.google.com/uc?export=download&id=${fileId}`}
        className="card-button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${title}`}
        download
        style={{ marginTop: 16, display: "inline-block" }}
      >
        Download
      </a>
    </div>
  );
};

export default ResourceViewer; 