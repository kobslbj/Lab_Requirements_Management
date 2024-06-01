'use server';

import { revalidatePath } from 'next/cache';

export async function createOrder(
  title: string,
  description: string,
  lab: string,
  priority: number,
) {
  console.log('Creating order...');
  console.log(title, description, lab, priority);

  revalidatePath('/');
}

export async function updateOrder() {
  // Update order logic here

  revalidatePath('/');
}

export async function completeOrder() {
  // Complete order logic here

  revalidatePath('/');
}
