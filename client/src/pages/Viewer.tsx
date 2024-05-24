import React, { useState } from "react";
import { ReactReader } from "react-reader";

function Viewer() {
  const [location, setLocation] = useState<string | number>(0);

  async function getHtmlBook() {
    const response = await fetch("http://localhost:3001/getmehtml", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/xml",
        // Authorization': `Bearer ${token}`, // notice the Bearer before your token
      },
    });
    const data = await response.text();
    console.log(data);
    return data;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ReactReader
        url="http://localhost:3001/getmehtml"
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        showToc={true}
      />
    </div>
  );
}
export default Viewer;
