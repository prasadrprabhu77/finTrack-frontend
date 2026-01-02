import Navbar from "../components/Navbar";
import { Plus, Edit, Trash2 } from "lucide-react";

const Transactions = () => {
  return (
    <>
      <Navbar />

      <div className="pt-20 px-6 bg-bgLight dark:bg-bgDark min-h-screen">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>

          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-cardDark rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr className="text-left">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Empty State */}
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                >
                  No transactions found.
                </td>
              </tr>

              {/* 
              SAMPLE ROW (for later reference)
              <tr className="border-t border-slate-200 dark:border-slate-700">
                <td className="px-4 py-3">12 Sep 2025</td>
                <td className="px-4 py-3 text-income">Income</td>
                <td className="px-4 py-3">Salary</td>
                <td className="px-4 py-3 font-medium">₹50,000</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <Edit size={16} className="cursor-pointer text-slate-500" />
                  <Trash2 size={16} className="cursor-pointer text-expense" />
                </td>
              </tr>
              */}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Transactions;
