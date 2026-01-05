import { useState } from "react";
import { X } from "lucide-react";
import api from "../api/axios";
import { getToken } from "../utils/auth";

const AddBudgetModal = ({ onClose, onSuccess, currentBudget }) => {
  const now = new Date();

  const [amount, setAmount] = useState(currentBudget?.amount || "");
  const [month, setMonth] = useState(currentBudget?.month || now.getMonth() + 1);
  const [year, setYear] = useState(currentBudget?.year || now.getFullYear());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !month || !year) return;

    setLoading(true);
    try {
      await api.post(
        "/budget",
        {
          amount: Number(amount),
          month: Number(month),
          year: Number(year),
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "ADD BUDGET ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-cardDark w-full max-w-sm rounded-xl p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {currentBudget ? "Update Budget" : "Set Monthly Budget"}
          </h2>
          <button onClick={onClose}>
            <X className="text-slate-500 hover:text-slate-700" />
          </button>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Budget Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter monthly budget"
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
            border-slate-300 dark:border-slate-600"
          />
        </div>

        {/* Month */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
            border-slate-300 dark:border-slate-600"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Year
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
            border-slate-300 dark:border-slate-600"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBudgetModal;
