import { useQuery } from "react-query";
import { api } from "../api";

export function useUsers() {
  return useQuery(
    "users",
    async () => {
      const response = await api.get("/users");
      const data = await response.json();

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
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );
}
