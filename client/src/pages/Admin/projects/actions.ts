import { toast } from 'react-toastify';
import { notifyError } from '@/lib/trpc/handlers/trpcError';
import { PROJECT_ACTIONS, type ProjectAction } from './types';
import type { ProjectMutations } from '../useMutations';
import type { Utils } from '@/lib/trpc/types';
import type { CreateProjectInput, UpdateProjectInput } from '@portfolio/shared';


export const handleCreate = async (
  mutations: ProjectMutations,
  utils: Utils,
  dispatch: React.Dispatch<ProjectAction>,
  data: CreateProjectInput
) => {
  dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: 'creating' });
  try {
    await mutations.create.mutateAsync(data);
    toast.success('Project created successfully');

    dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });
    await utils.projects.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUpdate = async (
  mutations: ProjectMutations,
  utils: Utils,
  dispatch: React.Dispatch<ProjectAction>,
  data: UpdateProjectInput
) => {
  dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: data.id });
  try {
    await mutations.update.mutateAsync({ ...data });
    toast.success('Project updated successfully');

    dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
    dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

    await utils.projects.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleDelete = async (
  mutations: ProjectMutations,
  utils: Utils,
  dispatch: React.Dispatch<ProjectAction>,
  id: string
) => {
  dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: id });
  try {
    await mutations.delete.mutateAsync({ id });
    toast.success('Project moved to trash');

    dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
    dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

    await utils.projects.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleRestore = async (
  mutations: ProjectMutations,
  utils: Utils,
  dispatch: React.Dispatch<ProjectAction>,
  id: string
) => {
  dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: id });
  try {
    await mutations.update.mutateAsync({ data: { id, isVisible: false } });
    toast.success('Project restored successfully. Status set to Draft.');

    dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
    dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

    await utils.projects.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
  }
};

