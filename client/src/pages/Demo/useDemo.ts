import { useState, useCallback } from "react";
import {
  SAMPLE_CODE,
  DEMO_LIST_ITEMS,
  DEMO_GRID_DATA,
  HEADER_TAGS,
  DEMO_TIMELINE_DATA,
} from "./consts";

export const useDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const handleSimulateLoading = useCallback(() => {
    setIsGridLoading(true);
    setTimeout(() => setIsGridLoading(false), 2000);
  }, []);

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const toggleGlobalLoading = useCallback(() => {
    setLoading((prev) => !prev);
  }, []);

  return {
    isModalOpen,
    setIsModalOpen,
    loading,
    checked,
    setChecked,
    isGridLoading,
    menuAnchorEl,
    sampleCode: SAMPLE_CODE,
    demoListItems: DEMO_LIST_ITEMS,
    demoGridData: DEMO_GRID_DATA,
    demoHeaderTags: HEADER_TAGS,
    demoTimelineData: DEMO_TIMELINE_DATA,
    handleSimulateLoading,
    handleOpenMenu,
    handleCloseMenu,
    toggleGlobalLoading,
  };
};
