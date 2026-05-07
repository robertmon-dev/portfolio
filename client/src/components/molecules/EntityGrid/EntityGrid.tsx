import { motion, AnimatePresence } from "framer-motion";
import { bem } from "@/components/utility/bem";
import type { EntityGridProps } from "./types";
import "./EntityGrid.scss";
import { getGridStyles } from "./utils";

export const EntityGrid = <T extends { id: string | number }>({
  data,
  renderItem,
  columns = { default: 1, md: 2, lg: 3 },
  gap = "1rem",
  isLoading,
  loadingItemsCount = 6,
  className = "",
  hoverable = true,
}: EntityGridProps<T>) => {
  const gridStyles = getGridStyles(columns, gap);
  const containerClasses = bem(
    "entity-grid",
    [hoverable && "hoverable"],
    className,
  );

  return (
    <div
      className={`entity-grid-container ${className}`}
      style={gridStyles}
      aria-busy={isLoading}
    >
      <div className={containerClasses}>
        <AnimatePresence mode="popLayout">
          {isLoading
            ? Array.from({ length: loadingItemsCount }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="entity-grid__skeleton"
                />
              ))
            : data.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="entity-grid__item"
                >
                  {renderItem(item)}
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
