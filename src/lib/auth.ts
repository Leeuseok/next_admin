import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { User } from '@/types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-here'
);

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: Omit<AuthPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return null;
    }

    // 실제 구현에서는 데이터베이스에서 사용자 정보를 가져와야 합니다
    // 여기서는 예시 데이터를 반환합니다
    return {
      id: payload.userId,
      email: payload.email,
      name: 'Admin User',
      role: payload.role as 'admin' | 'user' | 'moderator',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Get current user failed:', error);
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export function hasPermission(
  userRole: string,
  requiredRole: string
): boolean {
  const roleHierarchy: Record<string, number> = {
    user: 1,
    moderator: 2,
    admin: 3
  };

  return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
}

export function requireAuth() {
  return async (req: Request) => {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    return payload;
  };
}

export function requireRole(requiredRole: string) {
  return async (req: Request) => {
    const auth = await requireAuth()(req);
    if (auth instanceof Response) {
      return auth;
    }

    if (!hasPermission(auth.role, requiredRole)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return auth;
  };
}
