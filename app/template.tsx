import { ClipPathTransition } from "@/components/creative/clip-path-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ClipPathTransition variant="circle" duration={1}>{children}</ClipPathTransition>;
}
