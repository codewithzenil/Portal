'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { certificates } from './data';
import type { Certificate } from './definitions';
import { CertificateSchema } from './definitions';
import { revalidatePath } from 'next/cache';

// --- AUTH ACTIONS ---

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123'; // Default for demo purposes

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const password = formData.get('password');
    if (password === ADMIN_PASSWORD) {
      cookies().set('cws-session', 'authenticated', { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 });
    } else {
      return 'Invalid password.';
    }
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'Invalid credentials.';
    }
    return 'An unknown error occurred.';
  }
  redirect('/admin');
}

export async function logout() {
  cookies().delete('cws-session');
  redirect('/admin/login');
}

// --- CERTIFICATE ACTIONS ---

export async function findCertificate(idOrRoll: string): Promise<Certificate | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const certificate = certificates.find(c => c.id === idOrRoll || c.studentRollNumber === idOrRoll);
  return certificate || null;
}

export async function getCertificates(): Promise<Certificate[]> {
  return certificates.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  return certificates.find(c => c.id === id) || null;
}

export type FormState = {
  errors?: {
    studentName?: string[];
    studentRollNumber?: string[];
    certificateName?: string[];
    issuedDate?: string[];
  };
  message?: string | null;
  success?: boolean;
  certificate?: Certificate | null;
};

export async function createCertificate(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CertificateSchema.safeParse({
    studentName: formData.get('studentName'),
    studentRollNumber: formData.get('studentRollNumber'),
    certificateName: formData.get('certificateName'),
    issuedDate: formData.get('issuedDate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create certificate. Please check the fields.',
      success: false,
    };
  }

  const { studentName, studentRollNumber, certificateName, issuedDate } = validatedFields.data;
  
  // Check for duplicate roll number
  if (certificates.some(c => c.studentRollNumber === studentRollNumber)) {
    return {
        errors: { studentRollNumber: ['A certificate with this roll number already exists.'] },
        message: 'Duplicate roll number.',
        success: false,
    }
  }

  const newId = `cz-${new Date().getFullYear()}-${(certificates.length + 1).toString().padStart(3, '0')}`;

  const newCertificate: Certificate = {
    id: newId,
    studentName,
    studentRollNumber,
    certificateName,
    issuedDate,
  };

  certificates.unshift(newCertificate); // Add to the beginning of the array

  revalidatePath('/admin/certificates');
  revalidatePath('/verify');
  
  return {
    message: "Certificate created successfully.",
    success: true,
    certificate: newCertificate,
  }
}

export async function updateCertificate(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CertificateSchema.safeParse({
    studentName: formData.get('studentName'),
    studentRollNumber: formData.get('studentRollNumber'),
    certificateName: formData.get('certificateName'),
    issuedDate: formData.get('issuedDate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update certificate. Please check the fields.',
      success: false,
    };
  }

  const { studentName, studentRollNumber, certificateName, issuedDate } = validatedFields.data;
  
  const certIndex = certificates.findIndex(c => c.id === id);
  
  if (certIndex === -1) {
    return { message: 'Certificate not found.', success: false };
  }

  // Check if another certificate (not this one) has the same roll number
  if (certificates.some(c => c.studentRollNumber === studentRollNumber && c.id !== id)) {
    return {
        errors: { studentRollNumber: ['Another certificate with this roll number already exists.'] },
        message: 'Duplicate roll number.',
        success: false,
    }
  }

  const updatedCertificate = {
    ...certificates[certIndex],
    studentName,
    studentRollNumber,
    certificateName,
    issuedDate,
  };
  
  certificates[certIndex] = updatedCertificate;

  revalidatePath('/admin/certificates');
  revalidatePath(`/admin/certificates/edit/${id}`);
  revalidatePath(`/verify`);

  // redirect is not supposed to be used in actions that return a state.
  // Instead, the component should handle redirection.
  return {
    message: "Certificate updated successfully.",
    success: true,
    certificate: updatedCertificate,
  }
}

export async function deleteCertificate(id: string) {
  const index = certificates.findIndex(c => c.id === id);
  if (index > -1) {
    certificates.splice(index, 1);
    revalidatePath('/admin/certificates');
    revalidatePath('/verify');
    return { success: true, message: 'Certificate deleted.' };
  }
  return { success: false, message: 'Certificate not found.' };
}
