import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

export type CrudApi<T, CreateDto, UpdateDto> = {
  list: () => Promise<T[]>;
  getById?: (id: string) => Promise<T>;
  create: (data: CreateDto) => Promise<T>;
  update: (id: string, data: UpdateDto) => Promise<T>;
  remove: (id: string) => Promise<unknown>;
};

export function useCrud<T extends { _id: string }, CreateDto, UpdateDto>(
  resourceKey: string,
  api: CrudApi<T, CreateDto, UpdateDto>,
  options?: { listEnabled?: boolean },
) {
  const queryClient = useQueryClient();
  const listEnabled = options?.listEnabled ?? true;

  const listQuery = useQuery({
    queryKey: [resourceKey, "list"],
    queryFn: api.list,
    enabled: listEnabled,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: [resourceKey] });

  const createMutation = useMutation({
    mutationFn: api.create,
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDto }) =>
      api.update(id, data),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: api.remove,
    onSuccess: invalidate,
  });

  return {
    items: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error,
    refetch: listQuery.refetch,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useDetailQuery<T>(
  resourceKey: string,
  id: string | null,
  fetcher: (id: string) => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: [resourceKey, "detail", id],
    queryFn: () => fetcher(id!),
    enabled: Boolean(id),
    ...options,
  });
}
