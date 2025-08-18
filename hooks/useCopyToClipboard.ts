import { useState } from "react";

export function useCopyToClipboard() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number = 0) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isCopied = (index: number = 0) => copiedIndex === index;

  return {
    copyToClipboard,
    isCopied,
    copiedIndex,
  };
}
