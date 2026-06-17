import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-4 whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}
