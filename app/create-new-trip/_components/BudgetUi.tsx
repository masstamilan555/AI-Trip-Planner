export const SelectBudgetOptions = [
  {
    id: 1,

    title: "Cheap",

    desc: "Stay conscious of costs",

    icon: "💵",

    color: "bg-green-100 text-green-600",
  },

  {
    id: 2,

    title: "Moderate",

    desc: "Keep cost on the average side",

    icon: "💰",

    color: "bg-yellow-100 text-yellow-600",
  },

  {
    id: 3,

    title: "Luxury",

    desc: "Don’t worry about cost",

    icon: "💸",

    color: "bg-purple-100 text-purple-600",
  },
];

function BudgetUi({ onSelectedOption }: any) {
  return (
    <div className="mt-2 grid grid-cols-3 md:grid-cols-3 gap-2 items-center">
      {SelectBudgetOptions.map((item, index) => (
        <div
          key={index}
          className="border flex flex-col items-center p-4 rounded-lg mb-4 cursor-pointer hover:bg-primary hover:text-white transition-all"
          onClick={() => {
            onSelectedOption(item.title + ":" + item.desc);
          }}
        >
          <div className={`text-3xl p-3 rounded-full ${item.color}`}>
            {item.icon}
          </div>
          <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
          <h2 className="text-sm text-gray-500">{item.desc}</h2>
        </div>
      ))}
    </div>
  );
}

export default BudgetUi;
