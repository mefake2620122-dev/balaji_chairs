import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const getDataPath = (filename: string) => {
  const distPath = path.join(__dirname, '../data', filename);
  if (fs.existsSync(distPath)) return distPath;
  const srcPath = path.join(__dirname, '../../src/data', filename);
  if (fs.existsSync(srcPath)) return srcPath;
  return path.join(process.cwd(), 'src/data', filename);
};

const catalogPath = getDataPath('catalog.json');

export const getCatalog = (req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(catalogPath, 'utf-8');
    const catalog = JSON.parse(rawData);
    res.json({
      success: true,
      data: catalog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to read catalog data',
      error: (error as Error).message
    });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rawData = fs.readFileSync(catalogPath, 'utf-8');
    const catalog = JSON.parse(rawData);
    const product = catalog.products.find((p: any) => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' not found`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
      error: (error as Error).message
    });
  }
};
