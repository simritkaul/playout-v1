interface LineupItemProps {
  isEmptySlot: boolean;
  player: string;
  index: number;
}

const LineupItem = ({ isEmptySlot, player, index }: LineupItemProps) => {
  if (isEmptySlot) {
    return (
      <>
        <div
          key={index}
          className="p-3 bg-gray-200 shadow-inner rounded-lg text-center"
        >
          <p className="font-semibold text-gray-500">Empty Slot</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div key={index} className="p-3 bg-white shadow rounded-lg text-center">
        <p className="font-semibold text-blue-600">{player}</p>
        <p className="text-sm text-gray-500">Player {index + 1}</p>
      </div>
    </>
  );
};

export default LineupItem;
