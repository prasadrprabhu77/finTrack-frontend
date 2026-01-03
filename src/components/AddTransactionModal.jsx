import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../api/axios";
import { getToken } from "../utils/auth";

const AddTransactionModal = ({ onClose, onSuccess, transaction }) => {
  const isEdit = Boolean(transaction);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Prefill form in edit mode
  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setNote(transaction.note || "");
      setDate(
        transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : ""
      );
    }
  }, [transaction]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEdit) {
        // UPDATE
        await api.put(
          `/transactions/${transaction._id}`,
          {
            type,
            amount: Number(amount),
            category,
            note,
            ...(date && { date }),
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
      } else {
        // CREATE
        await api.post(
          "/transactions",
          {
            type,
            amount: Number(amount),
            category,
            note,
            ...(date && { date }),
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "TRANSACTION SAVE ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-cardDark w-full max-w-md rounded-xl p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose}>
            <X className="text-slate-500 hover:text-slate-700" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
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
            {loading
              ? "Saving..."
              : isEdit
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
