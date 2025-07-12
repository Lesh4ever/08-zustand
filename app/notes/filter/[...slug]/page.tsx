import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const responce = await fetchNotes({ query: "", page: 1, tag });

  return <NotesClient initialResponse={responce} tag={tag} />;
}
