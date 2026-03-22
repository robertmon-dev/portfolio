import { Controller } from "react-hook-form";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import {
  User,
  Link as LinkIcon,
  Plus,
  Trash2,
  Image,
  Type,
  Shield,
} from "lucide-react";
import { useUpdateUserForm } from "./hooks/useUpdate";
import type { UpdateUserFormProps } from "../types";

export const UpdateUserForm = (props: UpdateUserFormProps) => {
  const { onCancel } = props;
  const { t, roleOptions, socialsList, handlers, form } =
    useUpdateUserForm(props);

  return (
    <form onSubmit={form.submitForm} className="user-form">
      <div className="user-form__section">
        <div className="user-form__label">
          <User size={16} />
          {t("admin.users.form.profile_info", "Profile Info")}
        </div>
        <div className="user-form__grid">
          <Input
            label={t("common.name", "Name")}
            error={form.errors.name?.message}
            {...form.register("name")}
          />

          <div className="full-width sm-half">
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <Select
                  label={t("common.role", "Role")}
                  options={roleOptions}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={form.errors.role?.message}
                  leftIcon={<Shield size={16} />}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="full-width">
            <Input
              label={t("common.headline", "Headline")}
              leftIcon={<Type size={16} />}
              error={form.errors.headline?.message}
              {...form.register("headline")}
            />
          </div>
          <div className="full-width">
            <Input
              label={t("common.avatar", "Avatar URL")}
              leftIcon={<Image size={16} />}
              error={form.errors.avatarUrl?.message}
              {...form.register("avatarUrl")}
            />
          </div>
        </div>
      </div>

      <div className="user-form__divider" />

      <div className="user-form__section">
        <div
          className="user-form__label"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LinkIcon size={16} />
            {t("admin.users.form.socials", "Social Links")}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlers.addSocial}
            isIcon
          >
            <Plus size={16} />
          </Button>
        </div>

        <div className="user-form__socials-list">
          {socialsList.length === 0 && (
            <p
              className="tech-stack-form__empty"
              style={{ textAlign: "center", padding: "8px" }}
            >
              {t("admin.users.form.no_socials", "No social links added yet.")}
            </p>
          )}
          {socialsList.map((social, index) => (
            <div key={index} className="user-form__social-row">
              <Input
                placeholder="Platform (e.g. github)"
                value={social.platform}
                onChange={(e) =>
                  handlers.updateSocial(index, "platform", e.target.value)
                }
              />
              <Input
                placeholder="https://..."
                value={social.url}
                onChange={(e) =>
                  handlers.updateSocial(index, "url", e.target.value)
                }
              />
              <Button
                type="button"
                variant="danger"
                size="sm"
                isIcon
                onClick={() => handlers.removeSocial(index)}
                style={{ marginTop: "4px" }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="user-form__actions">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={form.isProcessing}
        >
          {t("common.cancel", "Cancel")}
        </Button>
        <Button type="submit" variant="primary" isLoading={form.isProcessing}>
          {t("common.save", "Save Changes")}
        </Button>
      </div>
    </form>
  );
};
