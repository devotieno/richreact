// Test cases for resource and lesson management features
const testCases = {
  resources: [
    {
      description: "Display resources including examiner reports",
      steps: "Login as student, navigate to /resources",
      expected: "Shows list of resources (including examiner reports) as cards",
    },
    {
      description: "Download examiner report and track in Firestore",
      steps: "Click download button on an examiner report",
      expected: "File opens, users.downloads and resourceUsage update",
    },
    {
      description: "Accessibility: ARIA labels on resource cards",
      steps: "Inspect resource cards for ARIA labels",
      expected: "Each card and download button has appropriate ARIA label",
    },
    {
      description: "Responsiveness: Resource cards layout",
      steps: "Resize window to <900px and tablet/mobile widths",
      expected: "Cards stack or grid responsively, no overflow or overlap",
    },
  ],
  tutor: [
    {
      description: "Teacher uploads lesson",
      steps: "Login as teacher, submit upload form on /tutor",
      expected: "File uploads to Storage, metadata in lessons collection",
    },
    {
      description: "Teacher updates video",
      steps: "Login as teacher, edit existing video on /tutor",
      expected: "File updates in Storage, metadata updates in lessons collection",
    },
    {
      description: "Student views lessons/videos",
      steps: "Login as student, navigate to /tutor",
      expected: "Sees lessons and videos organized by type, no upload form",
    },
    {
      description: "Accessibility: ARIA labels on lesson/video cards",
      steps: "Inspect lesson/video cards for ARIA labels",
      expected: "Each card and download button has appropriate ARIA label",
    },
    {
      description: "Responsiveness: Lessons/videos layout",
      steps: "Resize window to <900px and tablet/mobile widths",
      expected: "Cards and tabs are responsive, no overflow or overlap",
    },
  ],
};

export default testCases; 