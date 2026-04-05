export interface TimelineItem {
  id: string | number;
  content: React.ReactNode;
  oppositeContent?: React.ReactNode;
  gapToNext?: string;
}

export interface TimelineGridProps {
  items: TimelineItem[];
  className?: string;
  gap?: string;
}
