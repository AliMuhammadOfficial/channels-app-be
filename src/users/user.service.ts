interface User {
  id: string
  username: string
  email: string
}

const mockDatabase: Record<string, User> = {
  '1': { id: '1', username: 'john_doe', email: 'john@example.com' },
  '2': { id: '2', username: 'jane_doe', email: 'jane@example.com' },
}

export const getUserById = async (userId: string): Promise<User | null> => {
  const user = mockDatabase[userId]

  // Return null if the user is not found
  return user || null
}
