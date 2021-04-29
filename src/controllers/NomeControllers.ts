import { Request, Response } from 'express';

import db from '../database/connections';

type Nomes = {
  nome: string;
};

export default class NomeController {
  async index(req: Request, res: Response) {
    const { nome } = req.query as Nomes;

    const cards = nome
      ? await db('nomes').where('nomes.name', 'like', `%${name}%`)
      : await db('nomes');

    return res.json(cards);
  }

  async create(req: Request, res: Response) {
    const { nome, sobrenome } = req.body;

    const trx = await db.transaction();

    try {
      await trx('nomes').insert({
        nome,
        sobrenome,
      });
      await trx.commit();
      return res.status(201).send();
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        message: 'Ocorreu um erro inesperado ao adicionar um nome',
        error,
      });
    }
  }
}
