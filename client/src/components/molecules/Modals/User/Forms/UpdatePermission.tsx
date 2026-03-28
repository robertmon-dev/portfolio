import { Alert } from "@/components/atoms/Alert/Alert";
import { Button } from "@/components/atoms/Button/Button";
import { Shield, ShieldOff, CheckSquare } from "lucide-react";
import { useUpdatePermissionsForm } from "./hooks/useUpdatePermission";
import type { UpdatePermissionsFormProps } from "../types";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { AVAILABLE_RESOURCES } from "@portfolio/shared";

export const UpdatePermissionsForm = (props: UpdatePermissionsFormProps) => {
  const { onCancel } = props;
  const { t, isProcessing, handlers, handleSubmit, getFlagsForResource } =
    useUpdatePermissionsForm(props);

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <Alert
        variant="danger"
        title={t(
          "admin.users.modals.permissions.warning_title",
          "Proceed with caution!",
        )}
      >
        {t(
          "admin.users.modals.permissions.warning_desc",
          "Changing permissions instantly affects what this user can view or modify in the system.",
        )}
      </Alert>

      <div className="user-form__section">
        <div className="user-form__label">
          <Shield size={16} />
          {t("admin.users.modals.permissions.matrix", "Access Matrix")}
        </div>

        <div className="user-form__permissions-table">
          <div className="user-form__permissions-header">
            <div>{t("common.resource", "Resource")}</div>
            <div style={{ textAlign: "center" }}>
              {t("common.read", "Read")}
            </div>
            <div style={{ textAlign: "center" }}>
              {t("common.write", "Write")}
            </div>
            <div style={{ textAlign: "center" }}>
              {t("common.admin", "Admin")}
            </div>
            <div style={{ width: "32px" }}></div>
          </div>

          {AVAILABLE_RESOURCES.map((resource, index) => {
            const currentFlags = getFlagsForResource(resource);
            const allSelected = currentFlags.length === 3;

            return (
              <div
                key={resource}
                className={`user-form__permissions-row ${
                  index % 2 !== 0 ? "user-form__permissions-row--even" : ""
                }`}
              >
                <div className="user-form__resource-name">{resource}</div>
                <div className="user-form__checkbox-cell">
                  <Checkbox
                    checked={currentFlags.includes("READ")}
                    onChange={() => handlers.toggleFlag(resource, "READ")}
                    disabled={isProcessing}
                    colorChecked="#7aa2f7"
                  />
                </div>

                <div className="user-form__checkbox-cell">
                  <Checkbox
                    checked={currentFlags.includes("WRITE")}
                    onChange={() => handlers.toggleFlag(resource, "WRITE")}
                    disabled={isProcessing}
                    colorChecked="#ff9e64"
                  />
                </div>

                <div className="user-form__checkbox-cell">
                  <Checkbox
                    checked={currentFlags.includes("ADMIN")}
                    onChange={() => handlers.toggleFlag(resource, "ADMIN")}
                    disabled={isProcessing}
                    colorChecked="#f7768e"
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    isIcon
                    onClick={() =>
                      handlers.toggleAllForResource(resource, allSelected)
                    }
                    title={allSelected ? "Revoke All" : "Grant All"}
                  >
                    {allSelected ? (
                      <ShieldOff size={14} style={{ color: "#f7768e" }} />
                    ) : (
                      <CheckSquare size={14} style={{ color: "#9ece6a" }} />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="user-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isProcessing}
        >
          {t("common.cancel", "Cancel")}
        </Button>
        <Button type="submit" variant="primary" isLoading={isProcessing}>
          {t("common.save", "Update Permissions")}
        </Button>
      </div>
    </form>
  );
};
