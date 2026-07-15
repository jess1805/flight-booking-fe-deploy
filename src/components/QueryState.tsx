interface QueryStateProps {
  label?: string;
}

export function LoadingState({ label = "Loading…" }: QueryStateProps) {
  return (
    <div className="flex items-center justify-center py-12 text-sm text-slate-500">
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
      {label}
    </div>
  );
}

export function ErrorState({ label = "Something went wrong. Please try again." }: QueryStateProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {label}
    </div>
  );
}

export function EmptyState({ label = "Nothing here yet." }: QueryStateProps) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}
