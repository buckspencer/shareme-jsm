import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet, HelmetProvider, HelmetTags } from 'react-helmet-async';

const googleUrl = 'https://accounts.google.com/gsi/client';

export interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleButtonParams {
  onCredentialResponse: (response: GoogleCredentialResponse) => void;
}

const GoogleButton: FunctionComponent<GoogleButtonParams> = ({
  onCredentialResponse,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(
    typeof window !== 'undefined' && typeof (window as any).google !== 'undefined'
  );
  const divRef = React.createRef<HTMLDivElement>();

  // Helmet does not support the onLoad property of the script tag, so we have to manually add it like so
  const handleChangeClientState = (newState: any, addedTags: HelmetTags) => {
    if (addedTags && addedTags.scriptTags) {
      const foundScript = addedTags.scriptTags.find(
        ({ src }) => src === googleUrl
      );
      if (foundScript) {
        foundScript.addEventListener('load', () => setScriptLoaded(true), {
          once: true,
        });
      }
    }
  };

  useEffect(() => {
    if (scriptLoaded && divRef.current) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
        callback: onCredentialResponse,
      });
      (window as any).google.accounts.id.renderButton(divRef.current, {
        theme: 'outline',
        size: 'large',
        width: divRef.current.clientWidth,
      });
    }
  }, [scriptLoaded, divRef, onCredentialResponse]);

  return (
    <>
      <HelmetProvider>
        <Helmet onChangeClientState={handleChangeClientState}>
          <script src={googleUrl} async defer />
        </Helmet>
      </HelmetProvider>
      <div ref={divRef} />
    </>
  );
};

export default GoogleButton;
