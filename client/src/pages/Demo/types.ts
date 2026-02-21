import type { CardVariant } from '@/components/atoms/Card/types';
import type { TagVariant } from '@/components/atoms/Tag/types';

export interface TimelineSectionProps {
  timelineData: DemoTimelineData[];
}

export interface DemoTimelineData {
  id: string;
  titleKey: string;
  titleDefault: string;
  descKey: string;
  descDefault: string;
  cardVariant: CardVariant;
  titleColor?: string;
  tagVariant: TagVariant;
  tagKey: string;
  tagDefault: string;
  opacity?: number;
  gapToNext?: string;
}
