'use client';

/**
 * Upload single or multiple photo files from any device (Desktop, iPhone, Android, Tablet).
 * Attempts API upload first; falls back to client DataURL if offline or serverless.
 */
export async function uploadPhotosFromDevice(
  files: File[] | FileList
): Promise<string[]> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return [];

  const formData = new FormData();
  for (const file of fileArray) {
    formData.append('files', file);
  }

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.urls && data.urls.length > 0) {
        return data.urls;
      }
    }
  } catch (err) {
    console.warn('API upload failed, falling back to client-side data URL reader:', err);
  }

  // Graceful fallback to client DataURL
  const readPromises = fileArray.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  return Promise.all(readPromises);
}

export async function uploadSinglePhoto(file: File): Promise<string> {
  const urls = await uploadPhotosFromDevice([file]);
  if (!urls || urls.length === 0) {
    throw new Error('Failed to upload image file');
  }
  return urls[0];
}
