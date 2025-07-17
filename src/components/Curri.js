import React from 'react';
import './Curri.css';

const Curri = () => (
  <div className="curri-container" style={{ position: 'relative' }}>
    <img
      id="watermark-logo"
      src="/img/logo.png"
      alt="Richmond Tutorials watermark logo"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px',
        maxWidth: '70vw',
        opacity: 0.28,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'opacity 0.3s',
      }}
    />
          <section className="curriculum-section">
      <h2>Chemistry Curriculum Guide</h2>
      <p>
        This page gives you a clear overview of the main international chemistry courses
        for high school and pre-university students. Use it to compare your options and
        find helpful resources for your studies.
      </p>
      {/* IBDP Chemistry */}
      <h3>IBDP Chemistry</h3>
      <p>
        The International Baccalaureate Diploma Programme (IBDP) Chemistry course helps
        students develop scientific skills and critical thinking. It is recognized
        worldwide and prepares you for university science courses.
      </p>
      <ul>
        <li><strong>Topics:</strong> Structure of matter, bonding, energetics, kinetics, equilibrium, acids/bases, redox, organic chemistry, and more.</li>
        <li><strong>Assessment:</strong> Internal (practical work, investigation) and external (written exams).</li>
        <li><strong>Practical Work:</strong> Experiments, simulations, and an independent investigation.</li>
        <li><strong>Key Link:</strong> <a href="https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/chemistry/" target="_blank" rel="noopener noreferrer">IB Chemistry Curriculum</a></li>
      </ul>
      {/* Cambridge AS & A Level */}
      <h3>Cambridge International AS & A Level Chemistry</h3>
      <p>
        This course is for students aiming for university-level chemistry or related fields.
        It builds on IGCSE skills and is accepted by universities worldwide.
      </p>
      <ul>
        <li><strong>Topics:</strong> Physical, Inorganic, and Organic Chemistry (atomic structure, bonding, energetics, kinetics, equilibrium, periodicity, organic reactions, and more).</li>
        <li><strong>Assessment:</strong> Multiple-choice, structured questions, and practical exams.</li>
        <li><strong>Practical:</strong> Advanced lab skills, assessed in exams.</li>
        <li><strong>Key Link:</strong> <a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-chemistry-9701/" target="_blank" rel="noopener noreferrer">Cambridge Chemistry Page</a></li>
        <li><a href="https://www.cambridgeinternational.org/Images/414409-2025-2027-syllabus.pdf" target="_blank" rel="noopener noreferrer">Cambridge Syllabus PDF</a></li>
      </ul>
      {/* A-Level Chemistry Table */}
      <h3>A-Level Chemistry (Edexcel, OCR, AQA)</h3>
      <p>
        UK A-Level Chemistry is offered by several exam boards. All cover similar core topics
        and practical skills, but the structure and assessment may differ. These courses are
        ideal for students planning to study science at university.
      </p>
      <table style={{ width: '100%', maxWidth: '900px', margin: '1.5rem auto', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead>
          <tr style={{ background: '#eaf3fa', color: '#003366' }}>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Board</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Topics</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Assessment</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Practical</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Spec Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Edexcel</td>
            <td>19 topics: atomic structure, bonding, energetics, kinetics, equilibrium, redox, transition metals, organic chemistry</td>
            <td>3 written papers</td>
            <td>12 core practicals (internally assessed)</td>
            <td><a href="https://qualifications.pearson.com/content/dam/pdf/A%20Level/Chemistry/2015/specification-and-sample-assessments/9781446914326_GCE2015_A_CHEM.pdf" target="_blank" rel="noopener noreferrer">Edexcel PDF</a></td>
          </tr>
          <tr>
            <td>OCR</td>
            <td>6 modules: practical skills, foundations, periodic table, energetics, organic, analysis</td>
            <td>3 written papers</td>
            <td>12 practical activities (PAG1–PAG12)</td>
            <td><a href="https://www.ocr.org.uk/Images/171720-specification-accredited-a-level-gce-chemistry-a-h432.pdf" target="_blank" rel="noopener noreferrer">OCR PDF</a></td>
          </tr>
          <tr>
            <td>AQA</td>
            <td>3 sections: Physical, Inorganic, Organic (33 subtopics)</td>
            <td>3 written papers</td>
            <td>12 required practicals (internally assessed)</td>
            <td><a href="https://filestore.aqa.org.uk/resources/chemistry/specifications/AQA-7404-7405-SP-2015.PDF" target="_blank" rel="noopener noreferrer">AQA PDF</a></td>
          </tr>
        </tbody>
      </table>
      <ul style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>
        <li>All A-Level boards cover atomic structure, bonding, energetics, kinetics, equilibrium, redox, transition metals, and organic chemistry.</li>
        <li>Assessment: 3 written papers + practical endorsement.</li>
        <li>Practical: 12 required practicals or core activities.</li>
      </ul>
      {/* O-Level Chemistry */}
      <h3>O-Level Chemistry (CIE)</h3>
      <p>
        The Cambridge O-Level Chemistry course is for students aged 14–16. It covers the
        basics of chemistry and is equivalent to the UK GCSE. This course is suitable for
        students who want a strong foundation before moving to A-Level or IB.
      </p>
      <ul style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>
        <li><strong>Topics:</strong> Matter, experimental techniques, atoms, elements, stoichiometry, energetics, acids/bases, periodic table, metals, organic chemistry.</li>
        <li><strong>Assessment:</strong> Paper 1: Multiple Choice (40%)<br />Paper 2: Structured Questions (60%)</li>
        <li><strong>Key Link:</strong> <a href="https://www.cambridgeinternational.org/Images/414409-2025-2027-syllabus.pdf" target="_blank" rel="noopener noreferrer">CIE O-level Syllabus PDF</a></li>
      </ul>
      {/* Comparison Tips */}
      <h3>Which Chemistry Path Should I Choose?</h3>
      <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
        <strong>IBDP Chemistry:</strong> Best for a global education with a focus on scientific investigation.<br />
        <strong>Cambridge AS & A Level:</strong> Balanced course ideal for international students with lab and theory mix.<br />
        <strong>A-Level (Edexcel, OCR, AQA):</strong> Ideal if studying in the UK or wanting subject depth and strong practicals.<br />
        <strong>O-Level Chemistry:</strong> Perfect foundation for students aged 14–16 aiming to advance in science.
      </p>
    </section>
  </div>
);

export default Curri; 