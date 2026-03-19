export function ComplexityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-[5px] w-[5px] rounded-full ${
            i < level ? "bg-gray-600" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
