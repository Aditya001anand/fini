'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function createUser(userData) {
  // Validate userData to ensure it's not null or missing required fields
  if (!userData || !userData.clerkUserId || !userData.email) {
    console.error('Invalid user data provided:', userData);
    throw new Error('Invalid user data provided');
  }

  const { clerkUserId, email, name, imageUrl } = userData;

  try {
    // First check if the user already exists
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: clerkUserId,
      },
    });

    if (existingUser) {
      // Update existing user with new data
      return await db.user.update({
        where: {
          clerkUserId: clerkUserId,
        },
        data: {
          email,
          name,
          imageUrl,
        },
      });
    } else {
      // Create a new user
      return await db.user.create({
        data: {
          clerkUserId,
          email,
          name,
          imageUrl,
        },
      });
    }
  } catch (error) {
    console.error('Error in createUser server action:', error);
    throw new Error(`Failed to create or update user: ${error.message}`);
  }
}

// Alternative approach using Clerk's auth context
export async function createUserFromAuth() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('Authentication failed');
    }
    
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    
    // If user exists, just return it
    if (existingUser) {
      return existingUser;
    }
    
    // If we need to create the user, we'd need the email
    // This method would typically be called from a server component
    // or middleware where you have access to the full auth object
    
    // Note: You would need to implement a way to get user details
    // from Clerk's API or pass them directly
    
    console.error('User creation requires email and other details');
    throw new Error('Missing required user details');
  } catch (error) {
    console.error('Error in createUserFromAuth:', error);
    throw new Error(`Failed to create user from auth: ${error.message}`);
  }
}