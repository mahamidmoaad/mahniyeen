import { Suspense } from "react";
import ProsPageContent from "./ProsPageContent";

export default function ProsPage() {
  return (
    <Suspense fallback={<div>جارٍ تحميل قائمة المهنيين...</div>}>
      <ProsPageContent />
    </Suspense>
  );
}
