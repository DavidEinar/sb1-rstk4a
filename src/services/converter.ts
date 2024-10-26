import { PDFDocument } from 'pdf-lib';
import { ConversionOptions } from '../types';

export async function convertToPdf(file: File, options: ConversionOptions): Promise<Blob> {
  try {
    const fileType = file.type;
    const buffer = await file.arrayBuffer();

    // For existing PDFs, optimize and compress
    if (fileType === 'application/pdf') {
      return await optimizePdf(buffer, options);
    }

    // For images, create a new PDF and embed the image
    if (fileType.startsWith('image/')) {
      return await imageToPdf(buffer, fileType, options);
    }

    // For other document types (doc, docx, etc.), use a fallback conversion
    return await documentToPdf(buffer, fileType, options);
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error('Failed to convert file to PDF. Please try again.');
  }
}

async function optimizePdf(buffer: ArrayBuffer, options: ConversionOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(buffer);
  
  if (options.quality === 'standard') {
    // Compress images in the PDF
    pdfDoc.compress();
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

async function imageToPdf(buffer: ArrayBuffer, fileType: string, options: ConversionOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let image;
  if (fileType === 'image/jpeg') {
    image = await pdfDoc.embedJpg(buffer);
  } else if (fileType === 'image/png') {
    image = await pdfDoc.embedPng(buffer);
  } else {
    throw new Error('Unsupported image format');
  }

  // Calculate dimensions to fit the page while maintaining aspect ratio
  const imgDims = image.scale(1);
  const scale = Math.min(width / imgDims.width, height / imgDims.height);
  
  page.drawImage(image, {
    x: (width - imgDims.width * scale) / 2,
    y: (height - imgDims.height * scale) / 2,
    width: imgDims.width * scale,
    height: imgDims.height * scale,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

async function documentToPdf(buffer: ArrayBuffer, fileType: string, options: ConversionOptions): Promise<Blob> {
  // For demonstration, we'll create a simple PDF with a message
  // In a production environment, you'd want to use a proper document conversion library
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawText('Document conversion is not supported in this demo.', {
    x: 50,
    y: height - 50,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}