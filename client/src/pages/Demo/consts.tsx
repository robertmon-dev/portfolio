import React from 'react';
import { Settings } from 'lucide-react';
import type { ListOption } from '@/components/molecules/List/List';
import { ShieldCheck, Terminal } from 'lucide-react';
import type { HeaderProps } from '@/components/molecules/Sections/Header/types';
import type { DemoTimelineData } from './types';

export const SAMPLE_CODE = `const theme = "Tokyo Night";
function init() {
  console.log("System Ready");
}`;

export const DEMO_LIST_ITEMS: ListOption[] = [
  { id: '1', label: 'Ustawienia profilu', icon: React.createElement(Settings, { size: 18 }) },
  { id: '2', label: 'Powiadomienia', isActive: true },
  { id: '3', label: 'Zablokowane', disabled: true },
];

export const DEMO_GRID_DATA = [
  { id: 1, name: 'Frontend Ninjas', users: 4, status: 'Aktywna' },
  { id: 2, name: 'Backend Bros', users: 12, status: 'Aktywna' },
  { id: 3, name: 'Design Studio', users: 0, status: 'Wstrzymana' },
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
    titleDefault: "Inicjalizacja Projektu",
    descKey: "demo.timeline.step1.desc",
    descDefault: "Konfiguracja środowiska, instalacja paczek i setup palety Tokyo Night.",
    cardVariant: "elevated",
    tagVariant: "success",
    tagKey: "demo.timeline.status.done",
    tagDefault: "Zakończone",
    gapToNext: "20rem"
  },
  {
    id: "step-2",
    titleKey: "demo.timeline.step2.title",
    titleDefault: "Budowa Atomów",
    descKey: "demo.timeline.step2.desc",
    descDefault: "Stworzenie Buttonów, Inputów, Checkboxów i podstawowych tagów z wariantami.",
    cardVariant: "outlined",
    titleColor: "var(--tn-purple)",
    tagVariant: "primary",
    tagKey: "demo.timeline.status.done",
    tagDefault: "Zakończone",
    gapToNext: "5rem"
  },
  {
    id: "step-3",
    titleKey: "demo.timeline.step3.title",
    titleDefault: "Integracja Molekuł",
    descKey: "demo.timeline.step3.desc",
    descDefault: "Łączenie atomów w złożone komponenty, takie jak modale, gridy i listy danych.",
    cardVariant: "floating",
    titleColor: "var(--tn-blue)",
    tagVariant: "info",
    tagKey: "demo.timeline.status.inProgress",
    tagDefault: "W trakcie",
  },
  {
    id: "step-4",
    titleKey: "demo.timeline.step4.title",
    titleDefault: "SelectMolecule",
    descKey: "demo.timeline.step4.desc",
    descDefault: "Zbudowanie zaawansowanego dropdowna z wyszukiwarką i multi-selectem.",
    cardVariant: "flat",
    tagVariant: "default",
    tagKey: "demo.timeline.status.todo",
    tagDefault: "Oczekuje",
    opacity: 0.7
  }
];
