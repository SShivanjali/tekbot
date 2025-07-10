// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function sendMessage(message: string): Promise<string> {
  try {
    const res = await api.post<{ response: string }>('/chat', { message });
    return res.data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Sorry, something went wrong.';
  }
}

export default api;