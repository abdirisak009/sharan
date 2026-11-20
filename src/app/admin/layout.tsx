import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SHARAN Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-sand">{children}</div>;
}
