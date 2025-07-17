import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './examiner.css';

// Static chemistry-only examiner reports array
const examinerReports = [
  { year: '2024', url: 'https://drive.google.com/file/d/1C79uOOgU1kgzY5kAABSIzRHqZqPDXJdv/view?usp=drive_link' },
  { year: '2023', url: 'https://drive.google.com/file/d/1uGnQCk3-wUqyef4kaZLwX1zm9JwWfcbk/view?usp=drive_link' },
  { year: '2022', url: 'https://drive.google.com/file/d/1PGV_jeULxS8E5A8lL9bncG7lOeXf-4Dm/view?usp=drive_link' },
  { year: '2021', url: 'https://drive.google.com/file/d/1_iKBFB3vFwpch7rejBCnxdkEeGOyI7wu/view?usp=drive_link' },
  { year: '2020', url: 'https://drive.google.com/file/d/1myTIa6JOujiyF7ke4ZQpjdp9BWWsuixs/view?usp=drive_link' },
  { year: '2019', url: 'https://drive.google.com/file/d/1yfDcX8kX9k1a3XPRDb4j3TJnyJf0iDig/view?usp=drive_link' },
  { year: '2018', url: 'https://drive.google.com/file/d/1Li66DJ0HQLH08mxpUOcW0NYUqJKGvOSb/view?usp=drive_link' },
  { year: '2017', url: 'https://drive.google.com/file/d/1Qh2i9nVYzcYOkAHX0x8FCsPWI6uVHYVd/view?usp=drive_link' }
];
  

const Examiner = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Helper to extract fileId from Google Drive file URL
  const getDriveFileId = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    return match ? match[1] : null;
  };

  const handleView = (report) => {
    if (!currentUser) {
      toast.error('Please log in to view');
      return;
    }
    const fileId = getDriveFileId(report.url);
    if (fileId) {
      navigate(`/resource/view/${fileId}?title=${encodeURIComponent('Examiner Report ' + report.year)}`);
    } else {
      window.open(report.url, '_blank');
    }
  };

  return (
    <div className="examiner-page">
      <div className="container-examiner">
        <section className="hero-examiner">
          <div className="hero-examiner-text">
            <h1>Examiner Reports</h1>
            <p>
              <strong>Unlock Insights from Past Examiners</strong><br/>
              Access official examiner reports for Chemistry, year by year.<br/><br/>
              These reports provide valuable feedback, common mistakes, and tips directly from the examiners who mark the papers.<br/><br/>
              Use them to understand what examiners look for, improve your answers, and maximize your marks in future exams.
            </p>
          </div>
        </section>
        <div className="resources-grid">
          {examinerReports.map((report) => (
            <div className="card-examiner" key={report.year}>
              <h3 className="card-title">{report.year}</h3>
              <button
                className="card-button"
                onClick={() => handleView(report)}
                aria-label={`View Examiner Report for ${report.year}`}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examiner; 