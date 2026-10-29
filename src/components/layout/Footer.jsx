import { profile } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>

      <p className="footer__note">
        Cybersecurity Portfolio | SOC Analysis | Threat Detection | Security
        Research
      </p>

      <p className="footer__note">
        Built with React and Vite. Dedicated to continuous learning and
        cybersecurity.
      </p>
    </footer>
  );
}
