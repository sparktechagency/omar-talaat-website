

export default function Container({
  children,

  className = "",
}) {
  return (
    <div className={`container mx-auto px-4 lg:px-0 ${className}`}>{children}</div>
  );
}
