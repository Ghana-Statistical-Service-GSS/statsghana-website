import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
