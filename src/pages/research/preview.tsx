import Head from "@/components/Head";
import PublicLayout from "@/components/PublicLayout";
import ResearchPreview from "@/components/ResearchPreview";

const ResearchPreviewPage = () => {
  return (
    <PublicLayout>
      <Head title="Research Preview" />
      <ResearchPreview />
    </PublicLayout>
  );
};

export default ResearchPreviewPage;
