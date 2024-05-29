'use server';

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

require('dotenv').config()

export default async function validateUser(formData: FormData) {
    try{
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const response = await fetch(`${process.env.API_URL}/staffs/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
      const result = await response.json();
      cookies().set(
        'accesstoken', result.accessToken
      )
      cookies().set(
        'position', result.position
      )
      console.log(result)
      redirect('/')
;
    } catch (error) {
        console.error('Error during user validation:', error);
        throw error; 
    }
}


