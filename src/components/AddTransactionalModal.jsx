import { X } from "lucide-react";

const AddTransactionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-cardDark w-full max-w-md rounded-xl p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Transaction</h2>
          <button onClick={onClose}>
            <X className="text-slate-500 hover:text-slate-700" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type
            </label>
            <select className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Food, Rent"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Note
            </label>
            <input
              type="text"
              placeholder="Optional note"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
