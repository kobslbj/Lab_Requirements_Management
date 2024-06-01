'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createOrder(
  title: string,
  description: string,
  lab: string,
  priority: number,
  file: File | null,
) {
  const accessToken = cookies().get('accessToken')!.value;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('lab_name', lab);
  formData.append('priority', priority.toString());
  if (file) {
    formData.append('file', file);
  }
  const res = await fetch(`${process.env.API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Failed to create order');
  }

  const data = await res.json();
  console.log(data);

  revalidatePath('/');
}

export async function updateOrder() {
  // Update order logic here

  revalidatePath('/');
}

export async function completeOrder(id: string) {
  const accessToken = cookies().get('accessToken')!.value;

  const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    console.error('Failed to complete order');
    return;
  }

  revalidatePath('/');
}
