import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/profile");
  return { user: data?.profile, isLoading: !data && !error };
}
