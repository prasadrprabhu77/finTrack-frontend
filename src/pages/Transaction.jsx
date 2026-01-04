import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Plus, Edit, Trash2 } from "lucide-react";
import api from "../api/axios";
import { getToken } from "../utils/auth";
import AddTransactionModal from "../components/AddTransactionModal";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
  setLoading(true);
  try {
    const res = await api.get("/transactions", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        type: typeFilter || undefined,
        category: categoryFilter || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
    });

    setTransactions(res.data);
  } catch (error) {
    console.error("Failed to fetch transactions");
  } finally {
    setLoading(false);
  }
};

    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    fetchTransactions(); // refresh list
  } catch (error) {
    console.error(
      "DELETE TRANSACTION ERROR:",
      error.response?.data || error.message
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="pt-20 px-6 bg-bgLight dark:bg-bgDark min-h-screen">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>

          <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

                {/* Filters */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Category */}
            <input
              type="text"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Category"
              className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />

            {/* Start Date */}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />

            {/* End Date */}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={fetchTransactions}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
            >
              Apply Filters
            </button>

            <button
              onClick={() => {
                setTypeFilter("");
                setCategoryFilter("");
                setStartDate("");
                setEndDate("");
                fetchTransactions();
              }}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        </div>


        {showModal && (
          <AddTransactionModal
            onClose={() => {
              setShowModal(false);
              setEditingTransaction(null);
            }}
            onSuccess={fetchTransactions}
            transaction={editingTransaction}
          />
        )}


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
              {/* Loading State */}
              {loading && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    Loading transactions...
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && transactions.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}

              {/* Transactions */}
              {!loading &&
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <td className="px-4 py-3">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>

                    <td
                      className={`px-4 py-3 font-medium ${
                        tx.type === "income"
                          ? "text-income"
                          : "text-expense"
                      }`}
                    >
                      {tx.type}
                    </td>

                    <td className="px-4 py-3">{tx.category}</td>

                    <td className="px-4 py-3 font-medium">
                      ₹{tx.amount}
                    </td>

                    <td className="px-4 py-3 flex justify-end gap-3">
                      <Edit
                        size={16}
                        className="cursor-pointer text-slate-500"
                        onClick={() => {
                          setEditingTransaction(tx);
                          setShowModal(true);
                        }}
                      />
                      <Trash2
                        size={16}
                        className="cursor-pointer text-expense"
                        onClick={() => handleDelete(tx._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Transactions;
