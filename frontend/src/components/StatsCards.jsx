import { AlertTriangle, FileText, TrendingUp } from "lucide-react";

// Stats Cards Component
const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Invoices',
      value: stats.total,
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Duplicates Found',
      value: stats.duplicates,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'Total Savings',
      value: `₹${stats.savings.toFixed(2)}`,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <card.icon className={`${card.iconColor}`} size={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
