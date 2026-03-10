import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobSlugRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/categories/${slug}`);
}
