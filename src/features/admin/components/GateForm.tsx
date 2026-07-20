import { useState } from "react";
import { useUpdateGate } from "../api/useAdminFlights";
import { Pencil } from "lucide-react";

export function GateForm({ flightId, currentGate }: { flightId: string; currentGate: string | null }) {
  const [gate, setGate] = useState(currentGate ?? "");
  const updateGate = useUpdateGate(flightId);

  return (
    <div className="flex items-center gap-3">
      <input
        value={gate}
        onChange={(e) => setGate(e.target.value.toUpperCase())}
        placeholder="Gate (e.g. B12)"
        className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
      />
      <button
        onClick={() => updateGate.mutate(gate)}
        disabled={!gate.trim() || updateGate.isPending}
        className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
      >
        <Pencil size={14} className="text-teal-400" />
        {updateGate.isPending ? "Saving…" : "Update gate"}
      </button>
      {updateGate.isError && (
        <span className="text-xs text-red-400">Failed to update</span>
      )}
    </div>
  );
}