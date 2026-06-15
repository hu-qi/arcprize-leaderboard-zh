type Props = {
  color: "yellow" | "green" | "orange" | "magenta";
  children: React.ReactNode;
  className?: string;
};

export default function PixelTag({color, children, className = ""}: Props) {
  return (
    <div className={`text-xs pixel ${color} uppercase mb-4 ${className}`}>
      {children}
      <span className="category-cursor blink" />
    </div>
  );
}
