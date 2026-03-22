import { Button } from "@/components/atoms/Button/Button";
import { ShieldAlert, Shield, ShieldOff, CheckSquare } from "lucide-react";
import { useUpdatePermissionsForm } from "./hooks/useUpdatePermission";
import type { UpdatePermissionsFormProps } from "../types";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";

export const UpdatePermissionsForm = (props: UpdatePermissionsFormProps) => {
  const { onCancel } = props;
  const {
    t,
    availableResources,
    isProcessing,
    handlers,
    submitForm,
    getFlagsForResource,
  } = useUpdatePermissionsForm(props);

  return (
    <form onSubmit={submitForm} className="user-form">
      <div className="user-form__alert" style={{ marginBottom: "1.5rem" }}>
        <ShieldAlert size={18} />
        <div>
          <strong style={{ display: "block", marginBottom: "2px" }}>
            {t(
              "admin.users.modals.permissions.warning_title",
              "Proceed with caution!",
            )}
          </strong>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              opacity: 0.8,
              lineHeight: 1.4,
            }}
          >
            {t(
              "admin.users.modals.permissions.warning_desc",
              "Changing permissions instantly affects what this user can view or modify in the system.",
            )}
          </p>
        </div>
      </div>

      <div className="user-form__section">
        <div className="user-form__label">
          <Shield size={16} />
          {t("admin.users.modals.permissions.matrix", "Access Matrix")}
        </div>

        <div
          className="user-form__permissions-table"
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "rgba(26, 27, 38, 0.2)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
              gap: "8px",
              padding: "14px 20px",
              backgroundColor: "rgba(36, 40, 59, 0.9)",
              borderBottom: "1px solid var(--border-color)",
              fontWeight: "bold",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
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

          {availableResources.map((resource, index) => {
            const currentFlags = getFlagsForResource(resource);
            const allSelected = currentFlags.length === 3;

            return (
              <div
                key={resource}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                  gap: "8px",
                  padding: "10px 20px",
                  borderBottom:
                    index !== availableResources.length - 1
                      ? "1px dashed var(--border-color)"
                      : "none",
                  alignItems: "center",
                  backgroundColor:
                    index % 2 === 0 ? "transparent" : "rgba(26, 27, 38, 0.4)",
                  transition: "background-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--text-main)",
                    textTransform: "capitalize",
                    fontSize: "0.85rem",
                  }}
                >
                  {resource}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox
                    checked={currentFlags.includes("READ")}
                    onChange={() => handlers.toggleFlag(resource, "READ")}
                    disabled={isProcessing}
                    colorChecked="#7aa2f7"
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox
                    checked={currentFlags.includes("WRITE")}
                    onChange={() => handlers.toggleFlag(resource, "WRITE")}
                    disabled={isProcessing}
                    colorChecked="#ff9e64"
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
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
        <Button
          type="submit"
          variant="primary"
          isLoading={isProcessing}
          leftIcon={<Shield size={16} />}
        >
          {t("common.save", "Update Permissions")}
        </Button>
      </div>
    </form>
  );
};
