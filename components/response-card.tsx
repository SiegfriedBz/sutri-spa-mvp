"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResponseCardProps = {
  title: string;
  text: string;
};

export function ResponseCard({ title, text }: ResponseCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-emerald-800">{title}</CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={
              copied
                ? "border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                : undefined
            }
          >
            {copied ? (
              <>
                <Check className="text-emerald-600" data-icon="inline-start" />
                Copied
              </>
            ) : (
              <>
                <Copy data-icon="inline-start" />
                Copy
              </>
            )}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
