import { useMemo } from 'react';
import { GithubUpdateForm } from "./Forms/Update";
import { GithubLinkForm } from "./Forms/Link";
import type { GithubActions } from '@/pages/Admin/repos/types';

export const useModalContent = (state: GithubActions['state'], actions: GithubActions['actions']) => {
  const { activeModal, selectedRepo, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal || !selectedRepo) return null;

    const contentMap = {
      update: {
        title: `Edit Repository: ${selectedRepo.name}`,
        component: (
          <GithubUpdateForm
            repo={selectedRepo}
            onSubmit={(data) => actions.updateRepo(selectedRepo.id, data)}
            isLoading={isAnyProcessing}
          />
        )
      },
      link: {
        title: "Link Repository to Project",
        component: (
          <GithubLinkForm
            repo={selectedRepo}
            projects={state.projects}
            onSubmit={(projectId) => actions.linkToProject({
              repoId: selectedRepo.id,
              projectId
            })}
            isLoading={isAnyProcessing}
          />
        )
      }
    };

    return contentMap[activeModal];
  }, [activeModal, selectedRepo, isAnyProcessing, actions]);
};
