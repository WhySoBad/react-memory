import React from "react";
import { Helmet } from "react-helmet";
import config from "../data/website";

function SEO({ title }) {
  const metaDescription = config.siteDescription;
  const metaTitle = config.siteTitleTemplate.replace("%s", title);
  return (
    <Helmet defer={false}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="twitter:creator" content={config.social.twitter.link} />
      <meta name="github:creator" content={config.social.github.link} />
      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.siteName} />
    </Helmet>
  );
}

export default SEO;
