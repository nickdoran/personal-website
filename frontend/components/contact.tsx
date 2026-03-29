"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

interface FormState {
  status: "idle" | "sending" | "sent" | "error";
  message: string;
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: "sending", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setState({ status: "sent", message: "Message sent. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState({ status: "error", message: "Failed to send. Try emailing me directly." });
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-heading mb-4">Contact</h2>
        <p className="text-sm text-muted mb-8">
          Have a project in mind, want to collaborate, or just want to say hi?
          Reach out at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            {SITE.email}
          </a>{" "}
          or use the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label htmlFor="name" className="block text-xs text-muted mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-transparent border border-subtle rounded-md text-heading placeholder:text-muted/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs text-muted mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={200}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-transparent border border-subtle rounded-md text-heading placeholder:text-muted/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs text-muted mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-transparent border border-subtle rounded-md text-heading placeholder:text-muted/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={state.status === "sending"}
            className="px-5 py-2.5 text-xs bg-[var(--color-accent)] text-black rounded-md hover:bg-[var(--color-accent-hover)] transition-colors font-bold disabled:opacity-50"
          >
            {state.status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {state.message && (
            <p
              className={`text-xs ${
                state.status === "error" ? "text-red-400" : "text-[var(--color-accent)]"
              }`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
