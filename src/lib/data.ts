import type { Certificate } from './definitions';

// This is a mock in-memory database.
// Changes will not persist between server restarts.
export let certificates: Certificate[] = [
  {
    id: 'cz-2024-001',
    studentName: 'Alice Johnson',
    studentRollNumber: 'S001',
    certificateName: 'Advanced Web Development',
    issuedDate: '2024-05-20',
    pdfUrl: '/certs/cert-001.pdf',
  },
  {
    id: 'cz-2024-002',
    studentName: 'Bob Williams',
    studentRollNumber: 'S002',
    certificateName: 'Data Science with Python',
    issuedDate: '2024-05-22',
    pdfUrl: '/certs/cert-002.pdf',
  },
  {
    id: 'cz-2024-003',
    studentName: 'Charlie Brown',
    studentRollNumber: 'S003',
    certificateName: 'Machine Learning Foundations',
    issuedDate: '2024-06-01',
    pdfUrl: '/certs/cert-003.pdf',
  },
  {
    id: 'cz-2024-004',
    studentName: 'Diana Prince',
    studentRollNumber: 'S004',
    certificateName: 'UI/UX Design Principles',
    issuedDate: '2024-06-05',
  },
  {
    id: 'cz-2024-005',
    studentName: 'Ethan Hunt',
    studentRollNumber: 'S005',
    certificateName: 'Advanced Web Development',
    issuedDate: '2024-06-10',
    pdfUrl: '/certs/cert-005.pdf',
  },
];
