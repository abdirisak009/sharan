"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock, Trash2 } from "lucide-react";
import { changePassword, createUser, deleteUser, login, type FormState } from "@/app/admin/actions";

export const inputClass =
  "w-full rounded-xl border border-river-100 bg-white px-3.5 py-2.5 text-[0.95rem] text-deep outline-none transition placeholder:text-muted/60 focus:border-river focus:ring-4 focus:ring-river/15";
export const labelClass = "mb-1.5 block text-sm font-semibold text-deep";
export const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-river px-5 py-2.5 text-sm font-bold text-white transition hover:bg-river-700 disabled:cursor-not-allowed disabled:opacity-60";

export function Notice({ state }: { state: FormState }) {
  if (!state) return null;
  return state.error ? (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
      {state.error}
    </p>
  ) : (
    <p role="status" className="rounded-xl bg-growth-50 px-4 py-3 text-sm font-semibold text-growth-600 ring-1 ring-growth-100">
      {state.message}
    </p>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [show, setShow] = useState(false);
  const iconInput = `${inputClass} py-3 pl-11`;
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            autoFocus
            defaultValue={state?.email}
            key={state?.email}
            placeholder="you@sharan-somalia.org"
            className={iconInput}
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" required className={`${iconInput} pr-12`} />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted transition hover:bg-river-50 hover:text-river"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Notice state={state} />
      <button
        type="submit"
        disabled={pending}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-river to-river-700 py-3.5 font-bold text-white shadow-[0_14px_30px_-12px_rgba(35,115,190,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(35,115,190,0.9)] disabled:translate-y-0 disabled:opacity-70"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" aria-hidden="true" />
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function AddUserForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: FormState, data: FormData) => {
    const result = await createUser(prev, data);
    if (result?.message) formRef.current?.reset();
    return result;
  }, undefined);
  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="new-name" className={labelClass}>
            Name
          </label>
          <input id="new-name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="new-email" className={labelClass}>
            Email
          </label>
          <input id="new-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="new-password" className={labelClass}>
          Password <span className="font-normal text-muted">(at least 10 characters)</span>
        </label>
        <input id="new-password" name="password" type="password" autoComplete="new-password" minLength={10} required className={inputClass} />
      </div>
      <Notice state={state} />
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />} Add admin
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(async (prev: FormState, data: FormData) => {
    const result = await changePassword(prev, data);
    if (result?.message) formRef.current?.reset();
    return result;
  }, undefined);
  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div>
        <label htmlFor="current" className={labelClass}>
          Current password
        </label>
        <input id="current" name="current" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="next" className={labelClass}>
          New password <span className="font-normal text-muted">(at least 10 characters)</span>
        </label>
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={10} required className={inputClass} />
      </div>
      <Notice state={state} />
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />} Change password
      </button>
    </form>
  );
}

export function DeleteUserButton({ userId, name }: { userId: number; name: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Remove ${name}? They will no longer be able to sign in.`)) return;
        startTransition(async () => {
          const result = await deleteUser(userId);
          if (result?.error) alert(result.error);
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Remove
    </button>
  );
}
