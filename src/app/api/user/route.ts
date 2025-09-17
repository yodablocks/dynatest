import { NextRequest, NextResponse } from 'next/server';
import { userStore } from '@/lib/userStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { privy_id, address, login_type, login_id, total_value } = body;

    // Validate required fields
    if (!privy_id || !address || !login_type || !login_id) {
      return NextResponse.json(
        { detail: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userStore.userExists(address)) {
      return NextResponse.json(
        { detail: "User already exists" },
        { status: 409 }
      );
    }

    // Create user
    const userData = userStore.createUser({
      privy_id,
      address,
      login_type,
      login_id,
      total_value: total_value || 0
    });

    console.log(`New user added: ${address} (${login_type})`);

    return NextResponse.json(
      { message: "User created successfully", address },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all users (for debugging)
  const allUsers = userStore.getAllUsers();

  return NextResponse.json({
    users: allUsers,
    count: userStore.getUserCount()
  });
}
