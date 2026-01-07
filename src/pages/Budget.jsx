import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { getToken } from "../utils/auth";
import AddBudgetModal from "../components/AddBudgetModel";

const Budget = () => {
  const now = new Date();

  const [allBudgets, setAllBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({
    income: 0,
    expense: 0,
  });

  // 1️⃣ Fetch all budgets once
  const fetchAllBudgets = async () => {
    try {
      const res = await api.get("/budget/all", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setAllBudgets(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Failed to fetch budgets");
    }
  };

  //fetch monthly expense
  const fetchMonthlyExpense = async () => {
    try {
      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const total = res.data
        .filter((tx) => {
          const d = new Date(tx.date);
          return (
            tx.type === "expense" &&
            d.getMonth() + 1 === selectedMonth &&
            d.getFullYear() === selectedYear
          );
        })
        .reduce((sum, tx) => sum + tx.amount, 0);

      setMonthlyExpense(total);
    } catch (error) {
      console.error("Failed to fetch monthly expense");
    }
  };

  //fetch monthly transaction and statement data
  const fetchMonthlyStatement = async () => {
    try {
      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const filtered = res.data
        .filter((tx) => {
          const d = new Date(tx.date);
          return (
            d.getMonth() + 1 === selectedMonth &&
            d.getFullYear() === selectedYear
          );
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      let income = 0;
      let expense = 0;

      filtered.forEach((tx) => {
        if (tx.type === "income") income += tx.amount;
        else expense += tx.amount;
      });

      setMonthlyTransactions(filtered);
      setMonthlyTotals({ income, expense });
    } catch (error) {
      console.error("Failed to fetch monthly statement");
    }
  };



  // 2️⃣ Filter budget based on selected month & year
  useEffect(() => {
    const budget = allBudgets.find(
      (b) =>
        b.month === selectedMonth &&
        b.year === selectedYear
    );

    setSelectedBudget(budget || null);
    fetchMonthlyExpense();
    fetchMonthlyStatement();

  }, [allBudgets, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchAllBudgets();
  }, []);



  return (
    <>
      <Navbar />

      <div className="pt-20 px-6 bg-bgLight dark:bg-bgDark min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Budget</h1>

        {/* Month & Year Selector */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-4 shadow mb-6 flex gap-4 flex-wrap">

          {/* Month */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Year
            </label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg w-28 bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">

          {/* Budget Summary */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Budget for{" "}
                {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                onClick={() => setShowModal(true)}
                className="text-primary text-sm"
              >
                {selectedBudget ? "Edit" : "Set"} Budget
              </button>
            </div>

            {!selectedBudget ? (
              <p className="text-slate-500 dark:text-slate-400">
                No budget set for this month.
              </p>
            ) : (
              <p className="text-lg font-semibold">
                ₹{selectedBudget.amount}
              </p>
            )}
          </div>

          {/* Monthly Expense Summary */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-3">
              Monthly Expense
            </h2>

            <p className="text-2xl font-bold text-expense mb-1">
              ₹{monthlyExpense}
            </p>

            {selectedBudget && (
              <>
                <p className="text-sm text-slate-500 mb-2">
                  Remaining ₹{Math.max(selectedBudget.amount - monthlyExpense, 0)}
                </p>

                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded">
                  <div
                    className={`h-3 rounded ${monthlyExpense > selectedBudget.amount
                      ? "bg-expense"
                      : "bg-primary"
                      }`}
                    style={{
                      width: `${Math.min(
                        (monthlyExpense / selectedBudget.amount) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </>
            )}
          </div>

        </div>


        {/* Budget Modal */}
        {showModal && (
          <AddBudgetModal
            onClose={() => setShowModal(false)}
            onSuccess={fetchAllBudgets}
            currentBudget={selectedBudget}
            month={selectedMonth}
            year={selectedYear}
          />
        )}

        {/* Monthly Statement */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Statement —{" "}
            {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          {monthlyTransactions.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">
              No transactions found for this month.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
                      <th className="py-2">Date</th>
                      <th className="py-2">Description</th>
                      <th className="py-2">Type</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {monthlyTransactions.map((tx) => (
                      <tr
                        key={tx._id}
                        className="border-b border-slate-100 dark:border-slate-800"
                      >
                        <td className="py-2">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="py-2">{tx.category}</td>
                        <td className="py-2 capitalize">{tx.type}</td>
                        <td
                          className={`py-2 text-right font-medium ${tx.type === "income"
                              ? "text-income"
                              : "text-expense"
                            }`}
                        >
                          {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Monthly Totals */}
              <div className="mt-6 border-t pt-4 text-sm">
                <div className="flex justify-between mb-1">
                  <span>Total Income</span>
                  <span className="text-income font-medium">
                    +₹{monthlyTotals.income}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Total Expense</span>
                  <span className="text-expense font-medium">
                    -₹{monthlyTotals.expense}
                  </span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>Net Balance</span>
                  <span
                    className={
                      monthlyTotals.income - monthlyTotals.expense >= 0
                        ? "text-income"
                        : "text-expense"
                    }
                  >
                    ₹{monthlyTotals.income - monthlyTotals.expense}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default Budget;
