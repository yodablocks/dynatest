import { NextRequest, NextResponse } from 'next/server';
import { userStore } from '@/lib/userStore';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;

    const userData = userStore.getUser(address);
    if (!userData) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData);

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const body = await request.json();

    const updatedUser = userStore.updateUser(address, body);
    if (!updatedUser) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    console.log(`User updated: ${address}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
