"use client";

import { useState, useTransition } from "react";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";

import {
  generateReviewResponses,
  type GenerateResult,
} from "@/app/actions/generate-responses";
import { ResponseCard } from "@/components/response-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ReviewAssistant() {
  const [customerName, setCustomerName] = useState("");
  const [customerReview, setCustomerReview] = useState("");
  const [option1, setOption1] = useState<string | null>(null);
  const [option2, setOption2] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = customerReview.trim().length > 0 && !isPending;

  function handleReset() {
    setCustomerName("");
    setCustomerReview("");
    setOption1(null);
    setOption2(null);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result: GenerateResult = await generateReviewResponses(formData);

      if (!result.ok) {
        setOption1(null);
        setOption2(null);
        setError(result.error);
        return;
      }

      setOption1(result.option1);
      setOption2(result.option2);
      setError(null);
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="customerName"
            className="text-sm font-medium text-foreground"
          >
            Customer Name{" "}
            <span className="font-normal text-muted-foreground">
              (Optional / Opsional)
            </span>
          </label>
          <Input
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Sarah"
            disabled={isPending}
            autoComplete="off"
            className="h-10 bg-card"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="customerReview"
            className="text-sm font-medium text-foreground"
          >
            Customer Review{" "}
            <span className="font-normal text-muted-foreground">
              (Required / Wajib)
            </span>
          </label>
          <Textarea
            id="customerReview"
            name="customerReview"
            value={customerReview}
            onChange={(e) => setCustomerReview(e.target.value)}
            placeholder="Paste the customer review here…"
            required
            disabled={isPending}
            rows={6}
            className="min-h-32 bg-card"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="lg" disabled={!canSubmit} className="gap-2">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles data-icon="inline-start" />
                Generate Responses
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleReset}
            disabled={isPending}
            className="gap-2"
          >
            <RotateCcw data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </form>

      {isPending && (
        <div
          className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2.5 text-sm text-emerald-900"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="size-4 animate-spin shrink-0" />
          Drafting two Sutri Spa replies…
        </div>
      )}

      {error && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {option1 && option2 && !isPending && (
        <div className="grid gap-4 md:grid-cols-2">
          <ResponseCard title="Option 1 (Warm & Detailed)" text={option1} />
          <ResponseCard title="Option 2 (Short & Sweet)" text={option2} />
        </div>
      )}
    </div>
  );
}
