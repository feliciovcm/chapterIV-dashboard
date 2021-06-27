import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
// Como é uma função assincrona, o retorna será uma Promise de lista de users
export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return users;
}

export function useUsers() {
  return useQuery("myUsers", getUsers, {
    staleTime: 1000 * 5, // 5 segundos
  });
}
