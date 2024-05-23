// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

// eslint-disable-next-line import/prefer-default-export
export function GET() {
  const orders = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    creator: faker.string.uuid(),
    fab_id: faker.string.uuid(),
    lab_id: faker.string.uuid(),
    priority: faker.number.int({ min: 1, max: 3 }),
    is_completed: faker.datatype.boolean(),
  }));

  return new Response(JSON.stringify({ data: orders }), { status: 200 });
}
