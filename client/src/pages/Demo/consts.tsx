import React from 'react';
import { Settings, ShieldCheck, Terminal } from 'lucide-react';
import type { ListOption } from '@/components/molecules/List/List';
import type { HeaderProps } from '@/components/molecules/Sections/Header/types';
import type { DemoTimelineData } from './types';

export const SAMPLE_CODE = `const theme = "Tokyo Night";
function init() {
  console.log("System Ready");
}`;

export const DEMO_LIST_ITEMS: ListOption[] = [
  { id: '1', label: 'Profile Settings', icon: React.createElement(Settings, { size: 18 }) },
  { id: '2', label: 'Notifications', isActive: true },
  { id: '3', label: 'Blocked', disabled: true },
];

export const DEMO_GRID_DATA = [
  { id: 1, name: 'Frontend Ninjas', users: 4, status: 'Active' },
  { id: 2, name: 'Backend Bros', users: 12, status: 'Active' },
  { id: 3, name: 'Design Studio', users: 0, status: 'Paused' },
];

export const HEADER_TAGS: HeaderProps['tags'] = [
  { id: 1, children: 'v2.4.0', variant: 'primary', icon: React.createElement(Terminal, { size: 12 }) },
  { id: 2, children: 'Stable', variant: 'success', icon: React.createElement(ShieldCheck, { size: 12 }) },
  { id: 3, children: 'Env: Production', variant: 'info' },
  { id: 4, children: 'Security: Critical', variant: 'danger' }
];

export const DEMO_TIMELINE_DATA: DemoTimelineData[] = [
  {
    id: "step-1",
    titleKey: "demo.timeline.step1.title",
    titleDefault: "Project Initialization",
    descKey: "demo.timeline.step1.desc",
    descDefault: "Environment configuration, package installation, and Tokyo Night palette setup.",
    cardVariant: "elevated",
    tagVariant: "success",
    tagKey: "demo.timeline.status.done",
    tagDefault: "Completed",
    gapToNext: "3rem"
  },
  {
    id: "step-2",
    titleKey: "demo.timeline.step2.title",
    titleDefault: "Building Atoms",
    descKey: "demo.timeline.step2.desc",
    descDefault: "Creating Buttons, Inputs, Checkboxes, and basic Tags with variants.",
    cardVariant: "outlined",
    titleColor: "var(--tn-purple)",
    tagVariant: "primary",
    tagKey: "demo.timeline.status.done",
    tagDefault: "Completed",
    gapToNext: "5rem"
  },
  {
    id: "step-3",
    titleKey: "demo.timeline.step3.title",
    titleDefault: "Molecule Integration",
    descKey: "demo.timeline.step3.desc",
    descDefault: "Combining atoms into complex components like modals, grids, and data lists.",
    cardVariant: "floating",
    titleColor: "var(--tn-blue)",
    tagVariant: "info",
    tagKey: "demo.timeline.status.inProgress",
    tagDefault: "In Progress",
  },
  {
    id: "step-4",
    titleKey: "demo.timeline.step4.title",
    titleDefault: "SelectMolecule",
    descKey: "demo.timeline.step4.desc",
    descDefault: "Building an advanced dropdown with search and multi-select capabilities.",
    cardVariant: "flat",
    tagVariant: "default",
    tagKey: "demo.timeline.status.todo",
    tagDefault: "Pending",
    opacity: 0.7
  }
];
