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
    <div className="gm-meta-strip">
      <div className="gm-meta-cell">
        <span className="gm-meta-label">SECTION</span>
        <span className="gm-meta-value">{section}</span>
      </div>
      <div className="gm-meta-cell gm-meta-cell-center">
        <span className="gm-meta-label">SUBJECT</span>
        <span className="gm-meta-value">{subject}</span>
      </div>
      <div className="gm-meta-cell gm-meta-cell-right">
        <span className="gm-meta-label">REFERENCE</span>
        <span className="gm-meta-value">{reference}</span>
      </div>
    </div>
  );
}
