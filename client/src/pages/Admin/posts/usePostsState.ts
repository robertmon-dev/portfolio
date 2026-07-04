import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { usePostMutations } from "../useMutations";
import { usePostsActions } from "./usePostActions";
import {
  POST_ACTIONS,
  postReducer,
  initialState,
  type PostModalType,
} from "./types";
import type { CreatePostInput, UpdatePostInput, Post } from "@portfolio/shared";

export const usePostsState = () => {
  const utils = trpc.useUtils();
  const mutations = usePostMutations();
  const [state, dispatch] = useReducer(postReducer, initialState);
  const handlers = usePostsActions(mutations, utils, dispatch);

  const { data, isLoading: isPostsLoading } = trpc.admin.posts.list.useQuery({
    limit: 50,
  });
  const posts = useMemo(() => data?.items ?? [], [data]);

  const selectedPost = useMemo(
    () => posts.find((p) => p.id === state.selectedId) || null,
    [posts, state.selectedId],
  );

  return {
    state: {
      ...state,
      posts,
      selectedPost,
      isLoading: isPostsLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectPost: (id: string | null) =>
        dispatch({ type: POST_ACTIONS.SELECT_POST, payload: id }),

      openModal: (type: PostModalType, id?: string) => {
        if (id) {
          dispatch({ type: POST_ACTIONS.SELECT_POST, payload: id });
        }
        dispatch({ type: POST_ACTIONS.OPEN_MODAL, payload: type });
      },
      closeModals: () => dispatch({ type: POST_ACTIONS.CLOSE_MODALS }),
      createPost: (data: CreatePostInput) => handlers.handleCreate(data),
      updatePost: (data: UpdatePostInput) => handlers.handleUpdate(data),
      deletePost: (id: string) => handlers.handleDelete(id),
      togglePublish: (post: Post) => handlers.handleTogglePublish(post),
    },
  };
};
