import { faker } from '@faker-js/faker';

const fabs = [
  { id: faker.string.uuid(), name: 'A' },
  { id: faker.string.uuid(), name: 'B' },
  { id: faker.string.uuid(), name: 'C' },
];

const admins = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  fab_id: faker.helpers.arrayElement(fabs).id,
}));

const labs = [
  { id: faker.string.uuid(), name: '化學' },
  { id: faker.string.uuid(), name: '表面分析' },
  { id: faker.string.uuid(), name: '成分分析' },
];

export const workers = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  lab_id: faker.helpers.arrayElement(labs).id,
}));

export const orders = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  admin: faker.helpers.arrayElement(admins),
  fab: faker.helpers.arrayElement(fabs),
  lab: faker.datatype.boolean() ? faker.helpers.arrayElement(labs) : null,
  priority: faker.number.int({ min: 1, max: 3 }),
  is_completed: faker.datatype.boolean(),
}));
