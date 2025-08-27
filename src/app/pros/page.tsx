"use client";

import { Suspense } from "react";
import ProsPageContent from "./ProsPageContent";

export default function ProsPage() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <ProsPageContent />
    </Suspense>
  );
}
