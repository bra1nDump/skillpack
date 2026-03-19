export function RetentionBar({ value }: { value: number }) {
  const color =
    value >= 80
      ? "bg-emerald-500 text-emerald-500"
      : value >= 60
        ? "bg-amber-500 text-amber-500"
        : "bg-red-500 text-red-400";

  const [barColor, textColor] = color.split(" ");

  return (
    <div className="flex items-center gap-1.5">
      <div className="h-[4px] w-8 overflow-hidden rounded-[1px] bg-gray-200">
        <div
          className={`h-full rounded-[1px] ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`font-mono text-[10px] font-semibold ${textColor}`}>
        {value}%
      </span>
    </div>
  );
}
