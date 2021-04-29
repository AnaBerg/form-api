import { Request, Response } from 'express';

import db from '../database/connections';

type OurCard = {
  name: string;
};

export default class CardController {
  async index(req: Request, res: Response) {
    const { name } = req.query as OurCard;

    const cards = name
      ? await db('card').where('card.name', 'like', `%${name}%`)
      : await db('card');

    return res.json(cards);
  }

  async create(req: Request, res: Response) {
    const { name, cpf, card, cvv, expDate } = req.body;

    const trx = await db.transaction();

    try {
      await trx('card').insert({
        name,
        cpf,
        card,
        cvv,
        expDate,
      });
      await trx.commit();
      return res.status(201).send();
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        message: 'Unexpected error while trying to add a new card',
        error,
      });
    }
  }
}
