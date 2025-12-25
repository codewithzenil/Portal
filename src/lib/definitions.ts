import { z } from 'zod';

export type Certificate = {
  id: string;
  studentName: string;
  studentRollNumber: string;
  certificateName: string;
  issuedDate: string; // Should be in YYYY-MM-DD format
  pdfUrl?: string;
};

export const CertificateSchema = z.object({
  studentName: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  studentRollNumber: z.string().min(1, { message: "Student roll number is required." }),
  certificateName: z.string().min(5, { message: "Certificate name must be at least 5 characters." }),
  issuedDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
});
