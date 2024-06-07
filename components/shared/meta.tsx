import Head from 'next/head';
import { SEO_IMAGE } from 'data/constants';

type Props = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
};

const Meta = ({ title, keywords, description, image }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title.includes('Ahmad') ? title : title.concat(' | Monterya')}</title>
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <link rel="icon" href="/MT_icon.png" type="image/png" />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Montery MMORPG',
  keywords: 'GameWeb, Play to Earn, web games, mmorpg, 2dgame',
  description: 'Monterya MMORPG open world game play play to earn.',
  image: '/MT_icon.png'
};

export default Meta;
