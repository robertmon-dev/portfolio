import { Controller } from "react-hook-form";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import { User, Mail, Lock, Shield } from "lucide-react";
import { useCreateUserForm } from "./hooks/useCreate";
import type { CreateUserFormProps } from "../types";

export const CreateUserForm = (props: CreateUserFormProps) => {
  const { onCancel } = props;
  const { t, roleOptions, form } = useCreateUserForm(props);

  return (
    <form onSubmit={form.submitForm} className="user-form">
      <div className="user-form__section">
        <div className="user-form__label">
          <User size={16} />
          {t("admin.users.form.basic.info", "Basic Information")}
        </div>

        <div className="user-form__grid">
          <Input
            label={t("common.email", "Email")}
            placeholder="user@mail.com"
            error={form.errors.email?.message}
            leftIcon={<Mail size={16} />}
            {...form.register("email")}
          />
          <Input
            label={t("common.username", "Username")}
            placeholder="username"
            error={form.errors.username?.message}
            leftIcon={<User size={16} />}
            {...form.register("username")}
          />
          <Input
            label={t("common.password", "Password")}
            type="password"
            placeholder="Password"
            error={form.errors.password?.message}
            leftIcon={<Lock size={16} />}
            {...form.register("password")}
          />
          <Input
            label={t("common.name", "Full Name")}
            placeholder="Name"
            error={form.errors.name?.message}
            {...form.register("name")}
          />

          <div className="full-width">
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
          {t("common.create", "Create User")}
        </Button>
      </div>
    </form>
  );
};
