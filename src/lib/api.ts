const API_BASE_URL = 'https://photo.meycus.eu.org';
const DB_HOST = 'pdb1034.awardspace.net';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Database-Host': DB_HOST,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function signup(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Database-Host': DB_HOST,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}

export async function uploadPhoto(file: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(`${API_BASE_URL}/photos/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Database-Host': DB_HOST,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.url;
}

export async function getPhotos(token: string): Promise<Array<{ url: string; name: string }>> {
  const response = await fetch(`${API_BASE_URL}/photos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Database-Host': DB_HOST,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  return response.json();
}

export async function deletePhoto(photoName: string, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/photos/${photoName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Database-Host': DB_HOST,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete photo');
  }
}