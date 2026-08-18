import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;

    const filesToProcess: File[] = [];
    if (singleFile && singleFile.size > 0) {
      filesToProcess.push(singleFile);
    }
    if (files && files.length > 0) {
      for (const f of files) {
        if (f.size > 0 && !filesToProcess.includes(f)) {
          filesToProcess.push(f);
        }
      }
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of filesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Safe clean extension
      const origName = file.name || 'file.dat';
      const extMatch = origName.match(/\.([a-zA-Z0-9]+)$/);
      let ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
      if (ext === 'jpeg') ext = 'jpg';

      const isVideo =
        file.type?.startsWith('video/') ||
        ['mp4', 'mov', 'webm', 'm4v', 'avi', 'mkv'].includes(ext);

      // Generate clean unique filename
      const cleanBaseName = origName
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 30);
      const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const prefix = isVideo ? 'cinema_video' : 'table_photo';
      const fileName = `${prefix}_${cleanBaseName}_${uniqueSuffix}.${ext}`;

      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${fileName}`;
      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
      count: uploadedUrls.length,
    });
  } catch (error: any) {
    console.error('Upload error in /api/upload:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
