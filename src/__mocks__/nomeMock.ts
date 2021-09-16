import faker from 'faker';

export const generateNomeMock = (override = {}) => {
  return {
    nome: faker.name.firstName(),
    sobrenome: faker.name.lastName(),
    ...override,
  };
};

export const generateNomesMock = (n: number = 1, override = {}) => {
  return Array.from({ length: n }, (_, i) =>
    generateNomeMock({ id: i, ...override })
  );
};

export const generateNomeErrorMock = () => {
  return generateNomeMock({ nome: null });
};
