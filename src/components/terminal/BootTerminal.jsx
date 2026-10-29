import { useState } from "react";
import TerminalWindow from "../ui/TerminalWindow";
import GlitchText from "../ui/GlitchText";
import TypedCommand from "./TypedCommand";
import RoleCycler from "./RoleCycler";
import { profile } from "../../data/profile";

/** The hero: a terminal that "runs" whoami and shows who you are. */
export default function BootTerminal() {
  const [step, setStep] = useState(0);
  const next = (from) => () => setStep((s) => (s === from ? from + 1 : s));

  return (
    <TerminalWindow title={`${profile.handle}@kali: ~`} className="boot" bodyClassName="boot__body">
      <p className="line line--dim">Last login: from 10.0.0.1 on pts/0</p>

      <TypedCommand user={profile.handle} text="whoami" delay={500} onDone={next(0)} />
      {step >= 1 && (
        <div className="out">
          <h1 className="boot__name">
            <GlitchText text={profile.name} />
          </h1>
        </div>
      )}

      {step >= 1 && <TypedCommand user={profile.handle} text="cat role.txt" delay={250} onDone={next(1)} />}
      {step >= 2 && (
        <div className="out">
          <RoleCycler roles={profile.roles} />
        </div>
      )}

      {step >= 2 && <TypedCommand user={profile.handle} text="cat status.txt" delay={250} onDone={next(2)} />}
      {step >= 3 && (
        <div className="out">
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            {profile.status}
          </p>
          <div className="boot__actions">
            <a className="btn btn--primary" href="#projects-section">View projects</a>
            <a className="btn" href="#contact-section">Get in touch</a>
          </div>
        </div>
      )}

      {step >= 3 && (
        <p className="line">
          <span className="prompt-user">{profile.handle}@kali</span>
          <span className="prompt-sep">:~$</span> <span className="cursor" aria-hidden="true" />
        </p>
      )}
    </TerminalWindow>
  );
}
