import { useState } from "react";

// SelectDays component: returns the number of days as a string via onSelectedOption
const SelectDays = ({
  onSelectedOption,
}: {
  onSelectedOption: (v: string) => void;
}) => {
  const [days, setDays] = useState<number>(3);

  const handleDecrease = () => {
    setDays((prev) => {
      const newDays = Math.max(1, prev - 1);
      return newDays;
    });
  };

  const handleIncrease = () => {
    setDays((prev) => {
      const newDays = Math.min(30, prev + 1);
      return newDays;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">
        Select Trip Duration (in days)
      </h2>
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={handleDecrease}
          disabled={days === 1}
        >
          -
        </button>
        <span className="text-2xl font-semibold">{days}</span>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={handleIncrease}
          disabled={days === 30}
        >
          +
        </button>
      </div>
      <button
        className="p-2 bg-primary rounded-xl mt-2 text-white"
        onClick={() => onSelectedOption(`${days}`)}
      >
        Done
      </button>
    </div>
  );
};
export default SelectDays;