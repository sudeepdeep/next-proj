/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from "next/script";

type Props = {
  pId: any;
};

const GoogleAdsense: React.FC<Props> = ({ pId }) => {
  console.log(pId);
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;
