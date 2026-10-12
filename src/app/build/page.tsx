import { redirect } from "next/navigation";

/** El configurador heredado se conserva en componentes, pero no se expone como producto YOMI. */
export default function BuildPage() {
  redirect("/catalogo");
}
