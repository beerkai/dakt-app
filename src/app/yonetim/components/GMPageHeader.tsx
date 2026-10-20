interface GMPageHeaderProps {
  section: string;
  subject: string;
  reference: string;
}

export default function GMPageHeader({
  section,
  subject,
  reference,
}: GMPageHeaderProps) {
  return (
    <header className="gm-pagehead">
      <p className="gm-kicker">{section}</p>
      <div className="gm-pagehead-row">
        <p className="gm-page-title">{subject}</p>
        <span className="gm-ref">{reference}</span>
      </div>
    </header>
  );
}
