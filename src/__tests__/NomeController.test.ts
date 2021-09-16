import { Response, Request } from 'express';

import db from '../__mocks__/knexMock';
import NomeController from '../controllers/NomeControllers';

import { generateNomeMock, generateNomeErrorMock } from '../__mocks__/nomeMock';

jest.mock('../database/connections', () => require('../__mocks__/knexMock'));

beforeAll(async () => {
  await db.migrate.latest();
});

const resMock = {
  json: (res: any) => res,
  status: () => resMock,
  send: () => resMock,
} as unknown as Response<any>;

it('should create and list a nome', async () => {
  const nomeData = generateNomeMock();
  const controller = new NomeController();

  const post = await controller.create({ body: nomeData } as Request, resMock);

  expect(post).toMatchObject({ message: 'Nome criado com sucesso' });

  const get = await controller.index({ query: {} } as Request, resMock);

  expect(get).toMatchObject([nomeData]);
});

it('shouldnt create a nome', async () => {
  const nomeDataError = generateNomeErrorMock();
  const controller = new NomeController();

  const post = await controller.create(
    { body: nomeDataError } as Request,
    resMock
  );

  expect(post).toMatchObject({
    message: 'Ocorreu um erro inesperado ao adicionar um nome',
  });
});

it('should filter by nome', async () => {
  const nomeData = generateNomeMock();
  const controller = new NomeController();

  const post = await controller.create({ body: nomeData } as Request, resMock);

  expect(post).toMatchObject({ message: 'Nome criado com sucesso' });

  const get = await controller.index(
    { query: { nome: nomeData.nome } } as unknown as Request,
    resMock
  );

  expect(get).toMatchObject([nomeData]);
});
