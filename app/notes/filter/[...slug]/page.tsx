import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Notehub - ${category}`,
    description: `Here you can easily find all notes in the category ${category}.
`,
    openGraph: {
      title: `Notehub - ${category}`,
      description: `Here you can easily find all notes in the category ${category}.
`,
      url: `https://08-zustand-ten-tau.vercel.app/notes/filter/${category}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0].toLowerCase() === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Notes", "", 1, tag],
    queryFn: () =>
      fetchNotes({
        query: "",
        page: 1,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
