import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHelmet: React.FC = () => {
  const reactRouterLocation = useLocation();

  return (
    <Helmet>
      {/* Title */}
      <title>{import.meta.env.VITE_SEO_TITLE}</title>

      {/* Standard tags */}
      <meta name="title" content={import.meta.env.VITE_SEO_TITLE} />
      <meta name="description" content={import.meta.env.VITE_SEO_DESCRIPTION} />

      {/* OpenGraph (Facebook) tags */}
      <meta property="og:title" content={import.meta.env.VITE_SEO_TITLE} />
      <meta property="og:description" content={import.meta.env.VITE_SEO_DESCRIPTION} />
      <meta property="og:image" content={import.meta.env.VITE_SEO_IMAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${location.origin}${reactRouterLocation.pathname}`} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={import.meta.env.VITE_SEO_TWITTER_HANDLE} />
      <meta name="twitter:title" content={import.meta.env.VITE_SEO_TITLE} />
      <meta name="twitter:description" content={import.meta.env.VITE_SEO_DESCRIPTION} />
      <meta name="twitter:image" content={import.meta.env.VITE_SEO_IMAGE_URL} />
    </Helmet>
  );
};

export default SEOHelmet;
