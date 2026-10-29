import { useState } from "react";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import TerminalWindow from "../ui/TerminalWindow";
import { profile } from "../../data/profile";

/** No backend needed: the form opens the visitor's email app with the message filled in. */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact">
      <SectionHeading id="contact" command="./contact.sh" note="Internships, collaborations, CTF teams: all welcome." />
      <div className="contact">
        <TerminalWindow title="contact.sh" bodyClassName="contact__body">
          <form onSubmit={onSubmit} className="form">
            <label className="field">
              <span>Name</span>
              <input type="text" required value={form.name} onChange={update("name")} autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" required value={form.email} onChange={update("email")} autoComplete="email" />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea required rows={5} value={form.message} onChange={update("message")} />
            </label>
            <button type="submit" className="btn btn--primary">Send message</button>
            {sent ? (
              <p className="form__note" role="status">
                Your email app should open with the message filled in. If it didn't, write to{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            ) : null}
          </form>
        </TerminalWindow>

        <TerminalWindow title="socials.txt" bodyClassName="contact__links">
          <ul className="socials">
            <li>
              <span className="socials__key">email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.label}>
                <span className="socials__key">{s.label}</span>
                <a href={s.url} target="_blank" rel="noreferrer noopener">{s.url.replace(/^https?:\/\//, "")}</a>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </div>
    </Section>
  );
}
