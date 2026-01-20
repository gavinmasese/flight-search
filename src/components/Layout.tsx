import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white p-4 font-semibold">
        Flight Search
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
