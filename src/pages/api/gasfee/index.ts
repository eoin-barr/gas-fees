import fs from 'fs';
const path = require('path');
import nc, { RequestHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();

export const getGasFee: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/gasFee.json');
    const gasFee = fs.readFileSync(filePath, 'utf8');
    res.status(200).json(JSON.parse(gasFee));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGasFee: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/gasFee.json');
    const gasFee = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(gasFee);
    data.gasFee = req.body.gasFee;
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

handler.get(getGasFee).put(updateGasFee);

export default handler;
