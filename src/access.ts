// src/access.ts
export default function access(initialState: { role?: string }) {
  const { role } = initialState;
  return {
    isAdmin: role === 'admin',
    isStudent: role==='student'
  };
}