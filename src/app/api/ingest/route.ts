import { NextResponse } from 'next/server';
import { parseKitchenDocumentWithGemini } from '@/lib/services/gemini-ocr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, fileData, rawText } = body;

    if (!fileName && !rawText) {
      return NextResponse.json(
        { success: false, error: 'File name or raw text required for Gemini ingestion.' },
        { status: 400 }
      );
    }

    const result = await parseKitchenDocumentWithGemini(
      fileData || null,
      fileName || 'kitchen_note_scan.png',
      rawText
    );

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to process document with Gemini AI vision engine.' },
      { status: 500 }
    );
  }
}
