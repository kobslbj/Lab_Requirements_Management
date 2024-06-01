'use server';

import { revalidatePath } from 'next/cache';

export default async function createOrder(
  title: string,
  description: string,
  lab: string,
  priority: number,
) {
  console.log('Creating order...');
  console.log(title, description, lab, priority);

  revalidatePath('/');
}
