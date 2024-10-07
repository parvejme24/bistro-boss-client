import React from "react";
import { Helmet } from "react-helmet-async";

export default function DynamicTitle({ title }) {
  return (
    <Helmet>
      <title>Bistro Boss | {title}</title>
    </Helmet>
  );
}
