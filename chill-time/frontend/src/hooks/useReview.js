import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReviews, createReview, updateReviews, deleteReviews,createReply} from "../service/reviewService";

export function useReviews(movie_id) {
  const queryClient = useQueryClient();

  // 1. Fetching (Replaces Hydrate)
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", movie_id],
    queryFn: () => getAllReviews(movie_id),
  });

  // 2. Mutation: Create
    const createMutation = useMutation({
        mutationFn: (newReview) => createReview(
        newReview.movie_id,
        newReview.movie_title,
        newReview.rating,
        newReview.review
    ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews", movie_id] }),
  });

  // 3. Mutation: Update
    const updateMutation = useMutation({
        mutationFn: (updatedData) => updateReviews(
        updatedData.id,
        updatedData.movie_id,
        updatedData.movie_title,
        updatedData.rating,
        updatedData.review
    ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews", movie_id] }),
  });

  // 4. Mutation: Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteReviews(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews", movie_id] }),
  });

  const replyMutation = useMutation({
    mutationFn: ({ parentId, data }) =>
        createReply(parentId, data),

    onSuccess: () =>
        queryClient.invalidateQueries({
            queryKey: ["reviews", movie_id],
        }),
  });

  return {
    reviews: data,
    isLoading,
    error,
    reply: replyMutation.mutate,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
}