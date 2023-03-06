import NextHead from "next/head";

type Props = {
  title: string;
  description?: string;
};

const Head: React.FC<Props> = ({ title, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
