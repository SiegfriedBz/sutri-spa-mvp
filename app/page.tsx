import { Leaf } from "lucide-react";

import { ReviewAssistant } from "@/components/review-assistant";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-sm font-medium text-emerald-800">
          <Leaf className="size-4" aria-hidden />
          Sutri Spa · Canggu
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl">
            Review Assistant
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Draft warm, brand-consistent replies to customer reviews in seconds.
          </p>
        </div>

        <div className="grid gap-3 rounded-xl border border-border/80 bg-card/70 p-4 text-left text-sm leading-relaxed shadow-sm sm:grid-cols-2">
          <div>
            <p className="mb-1.5 font-medium text-emerald-900">How to use</p>
            <ol className="list-decimal space-y-1 pl-4 text-muted-foreground">
              <li>Paste the customer review (name is optional).</li>
              <li>Click Generate Responses.</li>
              <li>Copy the reply you like.</li>
            </ol>
          </div>
          <div>
            <p className="mb-1.5 font-medium text-emerald-900">Cara pakai</p>
            <ol className="list-decimal space-y-1 pl-4 text-muted-foreground">
              <li>Tempel ulasan pelanggan (nama opsional).</li>
              <li>Klik Generate Responses.</li>
              <li>Salin balasan yang Anda suka.</li>
            </ol>
          </div>
        </div>
      </header>

      <ReviewAssistant />
    </main>
  );
}
