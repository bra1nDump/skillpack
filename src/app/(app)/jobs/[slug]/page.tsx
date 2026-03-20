import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategorySlugRedirect({ params }: PageProps) {
  const { slug } = await params;

  redirect(`/categories/${slug}`);
}
