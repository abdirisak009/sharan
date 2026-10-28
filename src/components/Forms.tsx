"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Heart, Lock, Send } from "lucide-react";
import { site } from "@/lib/site";

// The site has no backend yet, so forms hand off to the visitor's email
// client with a prefilled message. Swap `sendViaEmail` for an API call
// (e.g. a Route Handler or a form service) when one is available.
function sendViaEmail(subject: string, lines: Record<string, string>) {
  const body = Object.entries(lines)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const field =
  "w-full rounded-xl border border-river-100 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-river focus:ring-4 focus:ring-river-100";
const label = "mb-1.5 block text-sm font-semibold text-deep";

function Success({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-growth-50 p-8 text-center ring-1 ring-growth-100" role="status">
      <CheckCircle2 className="h-12 w-12 text-growth" />
      <p className="mt-4 font-display text-xl font-bold text-deep">{title}</p>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    sendViaEmail("Newsletter subscription", { Email: email });
    setDone(true);
  }
  if (done) return <p className="mt-4 text-sm font-semibold text-growth-100">Thank you for subscribing.</p>;
  return (
    <form onSubmit={onSubmit} className="mt-4 flex rounded-full bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-sunrise">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-river-300"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-sunrise text-deep-950 transition hover:bg-white"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export function ContactForm() {
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    sendViaEmail(`[${f.get("topic")}] ${f.get("subject") || "Website enquiry"}`, {
      Name: String(f.get("name") ?? ""),
      Organisation: String(f.get("organisation") ?? ""),
      Email: String(f.get("email") ?? ""),
      Phone: String(f.get("phone") ?? ""),
      Message: "\n" + String(f.get("message") ?? ""),
    });
    setDone(true);
  }
  if (done)
    return (
      <Success
        title="Your email is ready to send"
        text="We opened your email app with your message. Press send there and our team in Jowhar will reply as soon as possible."
      />
    );
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Full name *
        </label>
        <input id="name" name="name" required className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="organisation" className={label}>
          Organisation
        </label>
        <input id="organisation" name="organisation" className={field} placeholder="Optional" />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email *
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="you@example.org" />
      </div>
      <div>
        <label htmlFor="phone" className={label}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={field} placeholder="+252 …" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="topic" className={label}>
          I would like to talk about *
        </label>
        <select id="topic" name="topic" required className={field} defaultValue="Partnership">
          <option>Partnership</option>
          <option>Donation</option>
          <option>Volunteering</option>
          <option>Careers</option>
          <option>Media</option>
          <option>Other</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="subject" className={label}>
          Subject
        </label>
        <input id="subject" name="subject" className={field} placeholder="How can we help?" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message *
        </label>
        <textarea id="message" name="message" required rows={6} className={field} placeholder="Write your message…" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-muted">
          <Lock className="h-3.5 w-3.5" /> We only use your details to respond to you.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-river px-7 py-3.5 font-bold text-white shadow-[0_10px_24px_-10px_rgba(35,115,190,0.9)] transition hover:-translate-y-0.5 hover:bg-river-700"
        >
          Send message <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

const amounts = [25, 50, 100, 250];
const impactHints: Record<number, string> = {
  25: "helps a village early warning committee prepare for the next flood season",
  50: "contributes to learning materials for children in a village school",
  100: "supports farmer training in climate-smart agriculture",
  250: "contributes to rehabilitating an irrigation canal with a farmer group",
};

export function DonateWidget() {
  const [freq, setFreq] = useState<"once" | "monthly">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);
  const value = custom ? Number(custom) : amount;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    sendViaEmail("Donation pledge", {
      Name: String(f.get("donor") ?? ""),
      Email: String(f.get("donorEmail") ?? ""),
      Amount: `USD ${value}`,
      Frequency: freq === "monthly" ? "Monthly" : "One-time",
    });
    setDone(true);
  }

  if (done)
    return (
      <Success
        title="Thank you for standing with the Shabelle"
        text="We opened your email app with your pledge. Once sent, our finance team will reply with secure giving details."
      />
    );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 rounded-full bg-river-50 p-1" role="radiogroup" aria-label="Donation frequency">
        {(["monthly", "once"] as const).map((f) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={freq === f}
            onClick={() => setFreq(f)}
            className={`rounded-full py-2.5 text-sm font-bold transition ${
              freq === f ? "bg-white text-river shadow" : "text-muted hover:text-deep"
            }`}
          >
            {f === "monthly" ? "Monthly" : "One-time"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Donation amount">
        {amounts.map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={!custom && amount === a}
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
            className={`rounded-xl border-2 py-3.5 font-display text-lg font-extrabold transition ${
              !custom && amount === a
                ? "border-sunrise bg-sunrise-50 text-deep"
                : "border-river-100 text-deep hover:border-river-300"
            }`}
          >
            ${a}
          </button>
        ))}
      </div>
      <div>
        <label htmlFor="custom" className={label}>
          Or enter another amount (USD)
        </label>
        <input
          id="custom"
          type="number"
          min={1}
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className={field}
          placeholder="Other amount"
        />
      </div>
      {!custom && impactHints[amount] && (
        <p className="rounded-xl bg-growth-50 p-4 text-sm text-deep ring-1 ring-growth-100">
          <strong>${amount}</strong> {freq === "monthly" ? "each month " : ""}
          {impactHints[amount]}.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donor" className={label}>
            Your name *
          </label>
          <input id="donor" name="donor" required className={field} />
        </div>
        <div>
          <label htmlFor="donorEmail" className={label}>
            Email *
          </label>
          <input id="donorEmail" name="donorEmail" type="email" required className={field} />
        </div>
      </div>
      <button
        type="submit"
        disabled={!value || value < 1}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sunrise py-4 font-display text-lg font-extrabold text-deep-950 shadow-[0_12px_28px_-12px_rgba(242,163,58,1)] transition hover:-translate-y-0.5 hover:bg-sunrise-600 hover:text-white disabled:opacity-50"
      >
        <Heart className="h-5 w-5" /> Give ${value || 0}
        {freq === "monthly" ? " monthly" : ""}
      </button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted">
        <Lock className="h-3.5 w-3.5" /> Every gift is managed under audited financial controls.
      </p>
    </form>
  );
}

export function FeedbackForm() {
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    sendViaEmail(`Feedback / complaint: ${f.get("kind")}`, {
      Type: String(f.get("kind") ?? ""),
      Location: String(f.get("location") ?? ""),
      "Contact (optional)": String(f.get("contact") ?? ""),
      Details: "\n" + String(f.get("details") ?? ""),
    });
    setDone(true);
  }
  if (done)
    return (
      <Success
        title="Thank you for telling us"
        text="Every concern is logged, answered and reported. You can also call our feedback line at any time."
      />
    );
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="kind" className={label}>
          What would you like to share? *
        </label>
        <select id="kind" name="kind" required className={field} defaultValue="Feedback or suggestion">
          <option>Feedback or suggestion</option>
          <option>Complaint about a service</option>
          <option>Safeguarding or misconduct concern</option>
          <option>Fraud or corruption concern</option>
        </select>
      </div>
      <div>
        <label htmlFor="location" className={label}>
          Village or district
        </label>
        <input id="location" name="location" className={field} placeholder="Optional" />
      </div>
      <div>
        <label htmlFor="details" className={label}>
          Tell us what happened *
        </label>
        <textarea id="details" name="details" required rows={5} className={field} />
      </div>
      <div>
        <label htmlFor="contact" className={label}>
          How can we reach you? (optional, you may stay anonymous)
        </label>
        <input id="contact" name="contact" className={field} placeholder="Phone or email" />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-7 py-3.5 font-bold text-white transition hover:bg-river"
      >
        Submit safely <Lock className="h-4 w-4" />
      </button>
    </form>
  );
}
