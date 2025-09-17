// Simple in-memory user storage
// In production, this should be replaced with a proper database

export interface UserData {
  privy_id: string;
  address: string;
  login_type: string;
  login_id: string;
  total_value: number;
  created_at: string;
  updated_at?: string;
}

class UserStore {
  private users: Map<string, UserData> = new Map();

  createUser(userData: Omit<UserData, 'created_at'>): UserData {
    const user: UserData = {
      ...userData,
      created_at: new Date().toISOString()
    };

    this.users.set(user.address, user);
    console.log(`User stored: ${user.address} (${user.login_type})`);
    return user;
  }

  getUser(address: string): UserData | null {
    return this.users.get(address) || null;
  }

  updateUser(address: string, updates: Partial<UserData>): UserData | null {
    const existing = this.users.get(address);
    if (!existing) return null;

    const updated: UserData = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };

    this.users.set(address, updated);
    console.log(`User updated: ${address}`);
    return updated;
  }

  getAllUsers(): UserData[] {
    return Array.from(this.users.values());
  }

  userExists(address: string): boolean {
    return this.users.has(address);
  }

  deleteUser(address: string): boolean {
    return this.users.delete(address);
  }

  getUserCount(): number {
    return this.users.size;
  }
}

// Export a singleton instance
export const userStore = new UserStore();
