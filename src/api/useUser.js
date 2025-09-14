import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// fetch profile
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/profile");
      return data;
    },
  });
};

// update profile
export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.put("/profile", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
};

// change password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload) => api.put("/password", payload),
  });
};

// register
export const useRegister = () => {
  return useMutation({
    mutationFn: (payload) => api.post("/register", payload),
  });
};

// admin: get all users
export const useAllUsers = (enabled = true) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get("/all");
      return data;
    },
    enabled,
  });
};

// admin: update user role
export const useUpdateUserRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }) => api.put(`/${userId}/role`, { role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
