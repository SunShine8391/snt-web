interface KitCardProps {
  value: string;
  label: string;
  bgColor: string;
}

export const KitCard = ({ value, label, bgColor }: KitCardProps) => {
  return (
    <div
      className={`h-32 p-5 flex flex-col justify-center items-center gap-2 rounded-md ${bgColor}`}
    >
      <div className="font-bold text-3xl text-slate-600">
        {value.toLocaleString()}
      </div>
      <div className="font-medium text-center text-sm text-slate-400">
        {label}
      </div>
    </div>
  );
};
