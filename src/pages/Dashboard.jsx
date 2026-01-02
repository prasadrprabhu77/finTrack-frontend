import Navbar from "../components/Navbar";

const Dashboard = () => {
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
              ₹0
            </p>
          </div>

          {/* Expense */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Expense
            </p>
            <p className="text-2xl font-bold text-expense mt-2">
              ₹0
            </p>
          </div>

          {/* Balance */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Balance
            </p>
            <p className="text-2xl font-bold text-primary mt-2">
              ₹0
            </p>
          </div>

        </div>

        {/* Budget Section */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Monthly Budget
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            No budget set for this month.
          </p>

          <div className="mt-4 h-3 w-full bg-slate-200 dark:bg-slate-700 rounded">
            <div className="h-3 w-1/3 bg-primary rounded"></div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            No transactions yet.
          </p>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
