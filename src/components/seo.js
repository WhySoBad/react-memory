import React from "react";
import { Helmet } from "react-helmet";
import config from "../data/website";

function SEO({ description, meta, title }) {
  const metaDescription = description ? description : config.siteDescription;
  const metaTitle = title
    ? config.siteTitleTemplate.replace("%s", title)
    : title;

  return (
    <Helmet defer={false}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.siteTitle} />
    </Helmet>
  );
}

export default SEO;
