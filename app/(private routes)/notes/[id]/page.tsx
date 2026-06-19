import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/serverApi";

type NotePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Note not found",
      description: "The requested note does not exist in NoteHub.",
      openGraph: {
        title: "Note not found",
        description: "The requested note does not exist in NoteHub.",
        url: `/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub note page",
          },
        ],
      },
    };
  }

  return {
    title: note.title,
    description: note.content.slice(0, 160),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160),
      url: `/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    notFound();
  }

  return <NoteDetailsClient note={note} />;
}
