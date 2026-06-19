import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";

export interface AgencyProfile {
  _id: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "user";
  address?: string;
  phoneNumber?: number;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  agency?: AgencyProfile;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  phoneNumber?: number;
  address?: string;
  password?: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const meQuery = useQuery<UserProfile>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 10, // Keep stale for 10 minutes
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const res = await api.put("/auth/profile", data);
      return res.data.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["auth", "me"], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });

  return {
    user: meQuery.data ?? null,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
    refetch: meQuery.refetch,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
