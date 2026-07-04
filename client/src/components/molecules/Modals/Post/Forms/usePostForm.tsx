import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema, zUrl, type Post } from "@portfolio/shared";
import type { PostFormProps } from "../types";

const PostFormSchema = CreatePostSchema.extend({
  coverImageUrl: z.union([zUrl, z.literal("")]).nullable(),
});

type PostFormValues = z.infer<typeof PostFormSchema>;

const toFormValues = (post?: Post | null): PostFormValues => ({
  title: post?.title ?? "",
  subtitle: post?.subtitle ?? "",
  slug: post?.slug ?? "",
  excerpt: post?.excerpt ?? "",
  content: post?.content ?? "",
  footer: post?.footer ?? "",
  coverImageUrl: post?.coverImageUrl ?? "",
  visibility: post?.visibility ?? "USER",
  tagIds: post?.tagIds ?? [],
  publishedAt: post?.publishedAt ?? null,
});

export const usePostForm = ({
  initialData,
  onSubmit,
}: Partial<PostFormProps>) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<PostFormValues>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: toFormValues(initialData),
  });

  useEffect(() => {
    if (initialData) reset(toFormValues(initialData));
  }, [initialData, reset]);

  const watchedTitle = watch("title");

  useEffect(() => {
    if (!initialData && !dirtyFields.slug && watchedTitle) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      setValue("slug", slug, { shouldValidate: true });
    }
  }, [watchedTitle, initialData, dirtyFields.slug, setValue]);

  return {
    register,
    handleSubmit: handleSubmit((data) =>
      onSubmit?.({
        ...data,
        subtitle: data.subtitle || null,
        excerpt: data.excerpt || null,
        footer: data.footer || null,
        coverImageUrl: data.coverImageUrl || null,
      }),
    ),
    errors,
    watch,
    setValue,
  };
};
