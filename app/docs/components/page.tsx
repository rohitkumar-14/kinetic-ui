import { redirect } from "next/navigation";

export default function ComponentsOverview() {
  // The gallery page was removed due to performance issues with too many WebGL contexts.
  // We redirect to the first component in the library.
  redirect("/docs/components/3d-card-peel");
}

