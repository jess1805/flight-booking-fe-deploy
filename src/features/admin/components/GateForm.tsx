import { useState } from "react";
import { useUpdateGate } from "../api/useAdminFlights";

export function GateForm({ flightId, currentGate }: { flightId: string; currentGate: string | null }) {
  const [gate, setGate] = useState(currentGate ?? "");
  const updateGate = useUpdateGate(flightId);

  return (
    <div className="flex items-center gap-2">
      <input
        value={gate}
        onChange={(e) => setGate(e.target.value.toUpperCase())}
        placeholder="Gate (e.g. B12)"
        className="w-28 rounded-md border border-slate-300 px-2 py-1 text-sm"
      />
      <button
        onClick={() => updateGate.mutate(gate)}
        disabled={!gate.trim() || updateGate.isPending}
        className="rounded-md bg-slate-900 px-3 py-1 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {updateGate.isPending ? "Saving…" : "Update gate"}
      </button>
      {updateGate.isError && <span className="text-xs text-red-600">Failed to update</span>}
    </div>
  );
}
