/** Section titles are written as shell commands: the heading is what you "ran". */
export default function SectionHeading({ id, command, note }) {
  return (
    <div className="heading">
      <h2 id={id} className="heading__cmd">
        <span className="prompt">$</span> {command}
      </h2>
      {note ? <p className="heading__note">{note}</p> : null}
    </div>
  );
}
