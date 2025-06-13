import { userServices } from '@/services';
import { RequestHandler } from 'express';

type Locals = { user_id: string };

type SummaryProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const summary: SummaryProps = async (_req, res) => {
  const { user_id } = res.locals;

  const result = await userServices.summary(user_id);

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
