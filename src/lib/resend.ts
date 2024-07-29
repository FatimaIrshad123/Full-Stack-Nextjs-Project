import { RESEND_API_KEY } from '@/secret';
import { Resend } from 'resend';

export const resend = new Resend(RESEND_API_KEY);