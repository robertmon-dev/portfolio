import { Octokit } from 'octokit';

export type GithubApiRepo = Awaited<ReturnType<Octokit['rest']['repos']['listForUser']>>['data'][number];
