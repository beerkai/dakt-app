import { ProfilTabs } from "./ProfilTabs";

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfilTabs />
      {children}
    </>
  );
}
