import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allBoards } from './PaperData';
import './PapersLanding.css';

// Improved: Extract file ID from Google Drive file URL (handles more formats)
const getDriveFileId = (url) => {
  if (!url) return null;
  // Handles /file/d/FILE_ID/ and id=FILE_ID
  const match = url.match(/(?:file\/d\/|id=)([\w-]+)/);
  return match ? match[1] : null;
};

// Improved: Check if URL is a Google Drive folder (handles more formats)
const isDriveFolder = (url) => {
  if (!url) return false;
  return /drive\.google\.com\/(drive\/folders|folders)\//.test(url);
};

const PapersLanding = () => {
  const [selectedBoard, setSelectedBoard] = useState(allBoards[0].name);
  const [selectedYear, setSelectedYear] = useState('All');
  const navigate = useNavigate();

  const selectedBoardData = useMemo(() => {
    const board = allBoards.find(b => b.name === selectedBoard);
    return board ? board.data : [];
  }, [selectedBoard]);

  const years = useMemo(() => {
    const uniqueYears = new Set(selectedBoardData.map(item => item.year));
    return ['All', ...Array.from(uniqueYears).sort().reverse()];
  }, [selectedBoardData]);

  const filteredPapers = useMemo(() => {
    if (selectedYear === 'All') {
      return selectedBoardData.flatMap(item => item.papers.map(paper => ({ ...paper, year: item.year })));
    }
    return selectedBoardData
      .filter(item => item.year === selectedYear)
      .flatMap(item => item.papers.map(paper => ({ ...paper, year: item.year })));
  }, [selectedBoardData, selectedYear]);

  // Robust click handler for all link types
  const handlePaperClick = (url, title) => {
    if (!url) return;
    if (isDriveFolder(url)) {
      navigate(`/resource/folder?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    } else {
      const fileId = getDriveFileId(url);
      if (fileId) {
        navigate(`/resource/view/${fileId}?title=${encodeURIComponent(title)}`);
      } else {
        // Fallback: open in new tab if not a recognized file/folder
        window.open(url, '_blank');
      }
    }
  };

  const handleBoardChange = (event) => {
    setSelectedBoard(event.target.value);
    setSelectedYear('All');
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="chem-papers-landing">
      <h1>Chemistry Past Papers</h1>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="board-select">Select Exam Board:</label>
          <select id="board-select" value={selectedBoard} onChange={handleBoardChange}>
            {allBoards.map(board => (
              <option key={board.name} value={board.name}>{board.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="year-select">Select Year:</label>
          <select id="year-select" value={selectedYear} onChange={handleYearChange}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="papers-list">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper, index) => (
            <div key={index} className="paper-item">
              <h3>{paper.label}</h3>
              <p>Board: {paper.board}</p>
              <div className="paper-links">
                {paper.qpUrl ? (
                  <button
                    className="resource-link-btn"
                    onClick={() => handlePaperClick(paper.qpUrl, `${paper.label} (QP)`)}
                    style={{ marginRight: 8 }}
                  >
                    Question Paper
                  </button>
                ) : (
                  <span>Question Paper (N/A)</span>
                )}
                {paper.msUrl ? (
                  <button
                    className="resource-link-btn"
                    onClick={() => handlePaperClick(paper.msUrl, `${paper.label} (MS)`)}
                  >
                    Mark Scheme
                  </button>
                ) : (
                  <span>Mark Scheme (N/A)</span>
                )}
                <span style={{ marginLeft: 16, color: '#888', fontSize: 12 }}>{paper.year}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No papers available for the selected board and year.</p>
        )}
      </div>
    </div>
  );
};

export default PapersLanding;