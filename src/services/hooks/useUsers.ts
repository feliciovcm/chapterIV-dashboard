import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface getUsersResponse{
  users: User[];
  totalCount: number;
}

// Como é uma função assincrona, o retorna será uma Promise de lista de users
export async function getUsers(page: number): Promise<getUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    }
  });

  const totalCount = Number(headers["x-total-count"]);

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
  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(["myUsers", page], () => getUsers(page), {
    staleTime: 1000 * 5, // 5 segundos
  });
}
// no primeiro parametro da função useQuery, é necessário passar o parametro que vai mudar,
// para ocorrer a diferenciação de uma pagina para outra. Esse parametro pode
// ser passado utilizando ["nome", param] ou ["nome", { param }]. Não importa!