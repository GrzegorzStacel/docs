import React from "react";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <main className="container mx-auto p-10 text-center">
      <h1>📘 Instrukcje pracy</h1>
      <p className="text-lg mt-2">Znajdziesz tu wszystkie procedury bezpieczeństwa, obsługi maszyn i instrukcje pracy.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Link className="button button--primary" to="/docs/pierwsza-pomoc">
          Zaczynamy →
        </Link>
      </div>
    </main>
  );
}
