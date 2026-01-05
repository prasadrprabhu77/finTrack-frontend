import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { getToken } from "../utils/auth";
import CategoryExpenseChart from "../components/CategoryExpenseChart";
import { Plus } from "lucide-react";
import AddBudgetModal from "../components/AddBudgetModel";


const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);


  const fetchBudget = async () => {
    try {
      const res = await api.get("/budget", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setBudget(res.data.budget);
      // console.log(res.data.budget)
    } catch (error) {
      console.error("Failed to fetch budget");
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // take latest 5
      setRecentTransactions(res.data.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch recent transactions");
    }
  };


  useEffect(() => {
    const fetchSummary = async () => {
      try {

        const res = await api.get("/transactions/summary", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        setSummary(res.data); // we will adjust after seeing logs
      } catch (error) {
        console.error("SUMMARY API ERROR:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const res = await api.get("/transactions/category", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        setCategoryData(res.data);
      } catch (error) {
        console.error("Failed to fetch category expense data");
      }
    };




    fetchSummary();
    fetchCategoryData();
    fetchBudget();
    fetchRecentTransactions();
  }, []);




  const spent = summary.totalExpense;
  const totalBudget = budget?.amount || 0;
  const percentage = totalBudget
    ? Math.min((spent / totalBudget) * 100, 100)
    : 0;


  return (
    <>
      <Navbar />

      <div className="pt-20 px-6 bg-bgLight dark:bg-bgDark min-h-screen">

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {/* Income */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Income
            </p>
            <p className="text-2xl font-bold text-income mt-2">
              {loading ? "—" : `₹${summary.totalIncome}`}
            </p>
          </div>

          {/* Expense */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Expense
            </p>
            <p className="text-2xl font-bold text-expense mt-2">
              {loading ? "—" : `₹${summary.totalExpense}`}
            </p>
          </div>

          {/* Balance */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Balance
            </p>
            <p className="text-2xl font-bold text-primary mt-2">
              {loading ? "—" : `₹${summary.balance}`}
            </p>
          </div>
          {/* Category Expense Chart */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Category-wise Expenses
            </h2>

            <CategoryExpenseChart data={categoryData} />
          </div>

        </div>

        {/* Budget Progress */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Monthly Budget</h2>

            <button
              onClick={() => setShowBudgetModal(true)}
              className="text-primary text-sm flex items-center gap-1"
            >
              <Plus size={14} />
              {budget ? "Edit" : "Set"}
            </button>
          </div>

          {!budget ? (
            <div className="text-slate-500 dark:text-slate-400">
              No budget set for this month.
            </div>
          ) : (
            <div>
              <div className="text-sm mb-2">
                ₹{summary.totalExpense} spent out of ₹{budget.amount}
              </div>

              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded">
                <div
                  className={`h-3 rounded ${percentage >= 100
                    ? "bg-expense"
                    : percentage > 80
                      ? "bg-warning"
                      : "bg-primary"
                    }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {showBudgetModal && (
          <AddBudgetModal
            onClose={() => setShowBudgetModal(false)}
            onSuccess={fetchBudget}
            currentBudget={budget}
          />
        )}

        {/* Recent Transactions Placeholder */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">
              Recent Transactions
            </h2>

            {recentTransactions.length === 0 ? (
              <div className="text-slate-500 dark:text-slate-400">
                No transactions yet.
              </div>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx._id}
                    className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2"
                  >
                    <div>
                      <p className="font-medium">{tx.category}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      className={`font-semibold ${tx.type === "income"
                          ? "text-income"
                          : "text-expense"
                        }`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;
