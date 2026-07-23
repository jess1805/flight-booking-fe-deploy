// two-word heading
export function TwoToneHeading({
  first,
  second,
  className,
}: {
  first: string;
  second: string;
  className: string;
}) {
  return (
    <h1 className={className}>
      <span className="text-white">{first}</span> <span className="text-teal-400">{second}</span>
    </h1>
  );
}
