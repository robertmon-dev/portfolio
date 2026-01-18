export interface TimelineItem {
  id: string | number;
  content: React.ReactNode;
}

export interface TimelineGridProps {
  items: TimelineItem[];
  className?: string;
  gap?: string;
}
