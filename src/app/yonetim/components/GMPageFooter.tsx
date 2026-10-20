interface GMPageFooterProps {
  section: string;
  page: string;
}

export default function GMPageFooter({ section, page }: GMPageFooterProps) {
  return (
    <footer className="gm-page-footer">
      <span>{section}</span>
      <span className="gm-page-footer-center">Sayfa {page}</span>
      <span className="gm-page-footer-right">Genel Müdürlük</span>
    </footer>
  );
}
