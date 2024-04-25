import { type NextApiRequest, type NextApiResponse } from 'next';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ success: true, timestamp: Date.now() },);
};