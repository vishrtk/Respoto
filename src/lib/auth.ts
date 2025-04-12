import { getServerSession } from "next-auth/next";

export async function getCurrentUser()  {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return null;
  }
  
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    accessToken: session.accessToken,
  };
}
