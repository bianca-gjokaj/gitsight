import { AlertTriangle } from "lucide-react";

export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center gap-3 p-4 rounded-md bg-danger/10 text-danger text-sm font-medium">
      <AlertTriangle size={18} />
      <span>{message}</span>
    </div>
  );
}