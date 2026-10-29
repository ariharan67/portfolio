import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import InteractiveTerminal from "../terminal/InteractiveTerminal";

export default function ShellSection() {
  return (
    <Section id="shell">
      <SectionHeading
        id="shell"
        command="./shell.sh"
        note="A working terminal. Type help, or click a command below it."
      />
      <InteractiveTerminal />
    </Section>
  );
}
