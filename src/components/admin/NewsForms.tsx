"use client";

import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react";
import { Check, ImagePlus, Loader2, Pencil, Save, Trash2, X } from "lucide-react";
import { createCategory, deleteCategory, deletePost, renameCategory, savePost } from "@/app/admin/news-actions";
import type { FormState } from "@/app/admin/actions";
import { newsImage, slugify } from "@/lib/news/format";
import { photos, type PhotoKey } from "@/lib/photos";
import { Notice, buttonClass, inputClass, labelClass } from "./AdminForms";

export type EditablePost = {
  id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  categoryId: number | null;
  image: string;
  published: boolean;
  date: string;
};

type Category = { id: number; name: string; posts: number };

export function PostForm({ post, categories }: { post: EditablePost; categories: Category[] }) {
  const [state, action, pending] = useActionState(savePost.bind(null, post.id), undefined);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(post.id));
  const [image, setImage] = useState(post.image);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const shownSlug = slugTouched ? slug : slugify(title);
  const current = preview ? { src: preview, alt: "" } : newsImage(image, title);

  function clearUpload() {
    if (fileRef.current) fileRef.current.value = "";
    setPreview(null);
  }

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${inputClass} text-lg font-semibold`}
          />
          <p className="mt-1.5 text-xs text-muted">
            Web address: <span className="font-mono text-deep">/news/{shownSlug || "…"}</span>{" "}
            {!slugTouched && (
              <button type="button" onClick={() => (setSlug(shownSlug), setSlugTouched(true))} className="font-semibold text-river hover:underline">
                Edit
              </button>
            )}
          </p>
          {slugTouched ? (
            <input
              name="slug"
              aria-label="Web address"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`${inputClass} mt-2 font-mono text-sm`}
            />
          ) : (
            <input type="hidden" name="slug" value={shownSlug} />
          )}
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>
            Summary <span className="font-normal text-muted">(shown on news cards and at the top of the article)</span>
          </label>
          <textarea id="excerpt" name="excerpt" rows={3} maxLength={500} defaultValue={post.excerpt} className={`${inputClass} resize-y`} />
        </div>

        <div>
          <label htmlFor="body" className={labelClass}>
            Article
          </label>
          <p className="mb-2 text-xs leading-relaxed text-muted">
            Leave an empty line between paragraphs. Start a line with <code className="rounded bg-sand px-1">## </code> for a heading, and with{" "}
            <code className="rounded bg-sand px-1">- </code> for a list item.
          </p>
          <textarea id="body" name="body" rows={18} defaultValue={post.body} className={`${inputClass} resize-y font-[inherit] leading-relaxed`} />
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl bg-sand p-5">
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span>
              <span className="block font-semibold text-deep">Published</span>
              <span className="text-xs text-muted">Off = draft, only visible here</span>
            </span>
            <input type="checkbox" name="published" defaultChecked={post.published} className="peer sr-only" />
            <span className="relative h-7 w-12 shrink-0 rounded-full bg-river-200 transition peer-checked:bg-growth peer-focus-visible:ring-4 peer-focus-visible:ring-river/20 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
          </label>
          <div className="mt-5">
            <label htmlFor="date" className={labelClass}>
              Date
            </label>
            <input id="date" name="date" type="date" required defaultValue={post.date} className={inputClass} />
          </div>
          <div className="mt-5">
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select id="category" name="category" defaultValue={post.categoryId ?? ""} className={inputClass}>
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className={labelClass}>Photo</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-deep">
            {/* eslint-disable-next-line @next/next/no-img-element -- local preview of a file that is not uploaded yet */}
            {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <Image src={current.src} alt={current.alt} fill sizes="320px" className="object-cover" />}
            {preview && (
              <button type="button" onClick={clearUpload} className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-deep shadow" aria-label="Remove uploaded photo">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <input type="hidden" name="image" value={image} />
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-river-200 px-4 py-2.5 text-sm font-semibold text-river transition hover:border-river hover:bg-river-50">
            <ImagePlus className="h-4 w-4" /> Upload a photo
            <input
              ref={fileRef}
              type="file"
              name="upload"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
          </label>
          <p className="mt-1.5 text-xs text-muted">JPG, PNG or WebP up to 8 MB. Or choose one below:</p>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {(Object.keys(photos) as PhotoKey[]).map((key) => (
              <button
                key={key}
                type="button"
                title={photos[key].place}
                onClick={() => (setImage(key), clearUpload())}
                className={`relative aspect-square overflow-hidden rounded-lg ring-2 transition ${
                  !preview && image === key ? "ring-sunrise" : "ring-transparent hover:ring-river-200"
                }`}
              >
                <Image src={photos[key].src} alt={photos[key].alt} fill sizes="64px" className="object-cover" />
                {!preview && image === key && (
                  <span className="absolute inset-0 flex items-center justify-center bg-deep/40">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="sticky bottom-0 z-10 -mx-4 border-t border-river-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <Notice state={state} />
          </div>
          <div className="flex shrink-0 gap-2">
            {post.id && <DeletePostButton id={post.id} />}
            <button type="submit" disabled={pending} className={buttonClass}>
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {post.id ? "Save" : "Create post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function DeletePostButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => confirm("Delete this post permanently?") && startTransition(async () => void (await deletePost(id)))}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
    </button>
  );
}

export function CategoryManager({ categories }: { categories: Category[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: FormState, data: FormData) => {
    const result = await createCategory(prev, data);
    if (result?.message) formRef.current?.reset();
    return result;
  }, undefined);
  const [rowState, setRowState] = useState<FormState>();

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-river-100 overflow-hidden rounded-2xl ring-1 ring-river-100">
        {categories.map((c) => (
          <CategoryRow key={c.id} category={c} onResult={setRowState} />
        ))}
      </ul>
      <Notice state={rowState} />
      <form ref={formRef} action={action} className="flex gap-2">
        <input name="name" required maxLength={60} placeholder="New category, e.g. Field updates" aria-label="New category name" className={inputClass} />
        <button type="submit" disabled={pending} className={`${buttonClass} shrink-0`}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />} Add
        </button>
      </form>
      <Notice state={state} />
    </div>
  );
}

function CategoryRow({ category, onResult }: { category: Category; onResult: (s: FormState) => void }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [pending, startTransition] = useTransition();
  const run = (fn: () => Promise<FormState>) =>
    startTransition(async () => {
      const result = await fn();
      onResult(result);
      if (result?.message) setEditing(false);
    });

  return (
    <li className="flex items-center gap-3 bg-white px-4 py-3">
      {editing ? (
        <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Category name" className={`${inputClass} py-1.5`} autoFocus />
      ) : (
        <span className="flex-1 font-semibold text-deep">
          {category.name} <span className="ml-1 text-xs font-normal text-muted">{category.posts} post{category.posts === 1 ? "" : "s"}</span>
        </span>
      )}
      {pending && <Loader2 className="h-4 w-4 animate-spin text-muted" />}
      {editing ? (
        <>
          <button type="button" onClick={() => run(() => renameCategory(category.id, name))} className="rounded-lg p-1.5 text-growth hover:bg-growth-50" aria-label="Save name">
            <Check className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => (setEditing(false), setName(category.name))} className="rounded-lg p-1.5 text-muted hover:bg-sand" aria-label="Cancel">
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => setEditing(true)} className="rounded-lg p-1.5 text-muted hover:bg-river-50 hover:text-river" aria-label={`Rename ${category.name}`}>
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => confirm(`Delete the category "${category.name}"?`) && run(() => deleteCategory(category.id))}
            className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${category.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </>
      )}
    </li>
  );
}
