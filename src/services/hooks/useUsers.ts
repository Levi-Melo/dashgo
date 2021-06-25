import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<{ users: User[] }>("users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}

type UserUsersOptions = {
  initialData: {
    users: User[];
    totalCount: number;
  };
};

export function useUsers(page: number, options?: UserUsersOptions) {
  return useQuery(["users", { page }], () => getUsers(page), {
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
