import Head from "@/components/Head";
import Layout from "@/components/Layout";
import ResearchGenerator from "@/components/ResearchGenerator";

export default function Home() {
  return (
    <Layout>
      <Head title="Home" />
      <ResearchGenerator />
    </Layout>
  );
}
