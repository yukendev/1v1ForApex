import React from "react";

export default function IdMosaic(id) {
  const initialId = id.substr(0, 3);
  const mosaicedId = initialId + "**********";
  return mosaicedId;
}
