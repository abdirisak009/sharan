"use client";

import { useEffect, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ChevronRight, Loader2, Plus, RotateCcw, Save, X } from "lucide-react";
import { resetContent, saveContent, type FormState } from "@/app/admin/actions";
import { emptyValue, type Field } from "@/lib/content/collections";
import { Notice, buttonClass, inputClass, labelClass } from "./AdminForms";

type Value = unknown;
type Obj = Record<string, Value>;

export function ContentEditor({
  contentKey,
  root,
  initial,
  original,
  isDefault: startsAsDefault,
}: {
  contentKey: string;
  root: Field;
  initial: Value;
  original: Value;
  isDefault: boolean;
}) {
  const [value, setValue] = useState<Value>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [state, setState] = useState<FormState>();
  const [isDefault, setIsDefault] = useState(startsAsDefault);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function save() {
    startTransition(async () => {
      const json = JSON.stringify(value);
      const result = await saveContent(contentKey, json);
      setState(result);
      if (result?.message) {
        setSaved(json);
        setIsDefault(false);
      }
    });
  }

  function reset() {
    if (!confirm("Replace this section with the original text from the organisational profile? Your edits will be lost.")) return;
    startTransition(async () => {
      const result = await resetContent(contentKey);
      setState(result);
      if (result?.message) {
        setValue(original);
        setSaved(JSON.stringify(original));
        setIsDefault(true);
      }
    });
  }

  return (
    <div>
      <FieldInput field={root} value={value} onChange={setValue} />

      <div className="sticky bottom-0 z-10 -mx-4 mt-10 border-t border-river-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            {state ? (
              <Notice state={state} />
            ) : (
              <p className="text-sm text-muted">
                {dirty ? "You have unsaved changes." : isDefault ? "Showing the original profile content." : "All changes saved."}
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            {!isDefault && (
              <button
                type="button"
                onClick={reset}
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted transition hover:bg-sand hover:text-deep disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" /> Reset to original
              </button>
            )}
            <button type="button" onClick={save} disabled={pending || !dirty} className={buttonClass}>
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange, id = "f" }: { field: Field; value: Value; onChange: (v: Value) => void; id?: string }) {
  switch (field.type) {
    case "text":
      return <input id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
    case "textarea":
      return (
        <textarea
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(8, Math.max(2, Math.ceil(String(value ?? "").length / 90)))}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      );
    case "number":
      return (
        <input
          id={id}
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className={`${inputClass} max-w-40`}
        />
      );
    case "select":
      return (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} className={`${inputClass} max-w-xs`}>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "numbers":
      return <NumbersInput id={id} value={(value as number[]) ?? []} onChange={onChange} />;
    case "strings":
      return <StringsInput id={id} value={(value as string[]) ?? []} onChange={onChange} />;
    case "group":
      return <GroupInput field={field} value={(value as Obj) ?? {}} onChange={onChange} id={id} />;
    case "list":
      return <ListInput field={field} value={(value as Obj[]) ?? []} onChange={onChange} id={id} />;
  }
}

function GroupInput({ field, value, onChange, id }: { field: Field & { type: "group" }; value: Obj; onChange: (v: Value) => void; id: string }) {
  return (
    <div className="space-y-5">
      {field.fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const input = <FieldInput field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} id={fid} />;
        if (f.type === "group") {
          return (
            <fieldset key={f.name} className="rounded-2xl border border-river-100 p-5">
              <legend className="px-2 font-display font-bold text-deep">{f.label}</legend>
              {input}
            </fieldset>
          );
        }
        return (
          <div key={f.name}>
            <label htmlFor={fid} className={labelClass}>
              {f.label}
            </label>
            {f.help && <p className="-mt-1 mb-2 text-xs text-muted">{f.help}</p>}
            {input}
          </div>
        );
      })}
    </div>
  );
}

function ListInput({ field, value, onChange, id }: { field: Field & { type: "list" }; value: Obj[]; onChange: (v: Value) => void; id: string }) {
  const item: Field = { ...field, type: "group" };
  return (
    <div className="space-y-3">
      {value.map((entry, i) => {
        const title = field.titleField ? String(entry[field.titleField] ?? "") : "";
        return (
          <details key={i} className="group/item rounded-2xl border border-river-100 bg-white open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
              <ChevronRight className="h-4 w-4 shrink-0 text-muted transition group-open/item:rotate-90" />
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-river-50 text-xs font-bold text-river">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate font-semibold text-deep">{title || <em className="text-muted">Untitled</em>}</span>
              <ItemButtons index={i} items={value} onChange={onChange} />
            </summary>
            <div className="border-t border-river-100 p-5">
              <FieldInput field={item} value={entry} onChange={(v) => onChange(value.map((e, j) => (j === i ? (v as Obj) : e)))} id={`${id}-${i}`} />
            </div>
          </details>
        );
      })}
      <AddButton onClick={() => onChange([...value, emptyValue(item) as Obj])} />
    </div>
  );
}

function StringsInput({ value, onChange, id }: { value: string[]; onChange: (v: Value) => void; id: string }) {
  return (
    <div className="space-y-2">
      {value.map((s, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2.5 w-6 shrink-0 text-right text-xs font-bold text-muted">{i + 1}.</span>
          <textarea
            id={i === 0 ? id : undefined}
            aria-label={`Item ${i + 1}`}
            value={s}
            rows={Math.max(1, Math.ceil(s.length / 90))}
            onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))}
            className={`${inputClass} resize-y`}
          />
          <div className="mt-1.5">
            <ItemButtons index={i} items={value} onChange={onChange} />
          </div>
        </div>
      ))}
      <AddButton onClick={() => onChange([...value, ""])} />
    </div>
  );
}

function NumbersInput({ value, onChange, id }: { value: number[]; onChange: (v: Value) => void; id: string }) {
  const [text, setText] = useState(value.join(", "));
  return (
    <input
      id={id}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        const nums = text
          .split(/[,\s]+/)
          .map(Number)
          .filter((n) => Number.isFinite(n) && n > 0);
        onChange(nums);
        setText(nums.join(", "));
      }}
      placeholder="e.g. 2, 13, 15"
      className={`${inputClass} max-w-xs`}
    />
  );
}

function ItemButtons<T>({ index, items, onChange }: { index: number; items: T[]; onChange: (v: Value) => void }) {
  const move = (to: number) => {
    const next = [...items];
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  };
  const btn = "rounded-lg p-1.5 text-muted transition hover:bg-river-50 hover:text-river disabled:opacity-30";
  // Stop clicks from toggling the surrounding <details>.
  const handle = (fn: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    fn();
  };
  return (
    <span className="flex shrink-0 items-center">
      <button type="button" title="Move up" aria-label="Move up" disabled={index === 0} onClick={handle(() => move(index - 1))} className={btn}>
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Move down"
        aria-label="Move down"
        disabled={index === items.length - 1}
        onClick={handle(() => move(index + 1))}
        className={btn}
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Remove"
        aria-label="Remove"
        onClick={handle(() => confirm("Remove this item?") && onChange(items.filter((_, j) => j !== index)))}
        className="rounded-lg p-1.5 text-muted transition hover:bg-red-50 hover:text-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </span>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-river-200 px-4 py-2 text-sm font-semibold text-river transition hover:border-river hover:bg-river-50"
    >
      <Plus className="h-4 w-4" /> Add item
    </button>
  );
}
