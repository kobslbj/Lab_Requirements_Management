'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createOrder(
  title: string,
  description: string,
  lab: string,
  priority: number,
  file: File | null
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
  console.log(file)
  console.log(formData)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
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

export async function completeOrder() {
  // Complete order logic here

  revalidatePath('/');
}
