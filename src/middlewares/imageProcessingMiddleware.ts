import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const watermarkPath = path.join(__dirname, '../../utils/watermark.png');

export const processImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) {
    return next();
  }

  const inputPath = req.file.path;
  const outputPath = path.join(path.dirname(inputPath), 'processed-' + req.file.filename);

  try {
    const watermark = await sharp(watermarkPath)
      .resize(100)
      .png()
      .toBuffer();

    await sharp(inputPath)
      .resize(800) // Resize image to max width 800px
      .composite([{ input: watermark, gravity: 'southeast', blend: 'overlay' }])
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Replace original file with processed file
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);

    next();
  } catch (error) {
    console.error('Error processing image:', error);
    next(error);
  }
};
