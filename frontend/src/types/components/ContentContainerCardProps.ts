import type { ReactNode } from "react";

export interface ContentContainerCardProps {
  title: string;
  children: ReactNode;
  variant?: "black" | "pink";
}