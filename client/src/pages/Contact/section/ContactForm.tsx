import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ContactFormInputSchema,
  type ContactFormInput,
} from "@portfolio/shared";
import { useContactMutations } from "../useContactMutations.ts";
import { useContactActions } from "../useContactActions.ts";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Card } from "@/components/atoms/Card/Card";
import "./ContactForm.scss";

export const ContactForm = () => {
  const { t } = useTranslation();
  const [ticketId, setTicketId] = useState<string | null>(null);

  const mutations = useContactMutations();
  const { handleSubmit: submitAction } = useContactActions(mutations);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormInputSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    const res = await submitAction(data);
    setTicketId(res.ticketId);
  };

  return (
    <div className="contact-form-container">
      <AnimatePresence mode="wait">
        {!ticketId ? (
          <motion.div
            key="form-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card
              variant="levitating-transparent"
              padding="lg"
              className="contact-card"
            >
              <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("name")}
                  placeholder={t("contact.form.name", "Your name")}
                  error={errors.name?.message}
                  fullWidth
                />

                <Input
                  {...register("email")}
                  placeholder={t("contact.form.email", "Your email")}
                  error={errors.email?.message}
                  fullWidth
                />

                <Input
                  {...register("subject")}
                  placeholder={t("contact.form.subject", "Subject")}
                  error={errors.subject?.message}
                  fullWidth
                />

                <TextArea
                  {...register("message")}
                  placeholder={t("contact.form.message", "Your message...")}
                  error={errors.message?.message}
                  fullWidth
                  rows={10}
                />

                <Button
                  variant="secondary"
                  type="submit"
                  isLoading={mutations.submit.isPending}
                  fullWidth
                >
                  {t("common.send", "Send message")}
                </Button>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card
              variant="levitating-transparent"
              padding="lg"
              className="contact-success-card"
            >
              <div className="contact-success">
                <h3>{t("contact.success.title", "Message sent!")}</h3>
                <p>
                  {t(
                    "contact.success.text",
                    "Thanks! You'll find a confirmation in your email.",
                  )}
                </p>
                <div className="contact-success__ticket">
                  ID: <span>{ticketId}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setTicketId(null)}
                  fullWidth
                >
                  {t("common.back", "Back")}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
