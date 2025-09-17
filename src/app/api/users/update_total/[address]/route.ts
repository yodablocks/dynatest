import { NextRequest, NextResponse } from 'next/server';
import { userStore } from '@/lib/userStore';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const body = await request.json();
    const { total_value } = body;

    const updatedUser = userStore.updateUser(address, { total_value });
    if (!updatedUser) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    console.log(`User total value updated: ${address} -> ${total_value}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating user total value:', error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
