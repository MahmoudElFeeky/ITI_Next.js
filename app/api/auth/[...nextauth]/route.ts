import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple lab login: admin / admin
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Wrapper for Next.js 15+ async params
export async function GET(request: Request, context: { params: Promise<{ nextauth: string[] }> }) {
  const params = await context.params;
  return handler(request, { params });
}

export async function POST(request: Request, context: { params: Promise<{ nextauth: string[] }> }) {
  const params = await context.params;
  return handler(request, { params });
}
