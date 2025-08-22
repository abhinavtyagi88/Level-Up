"use client";

import { useEffect, useState } from "react";

export default function PublicPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/public`) 
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  // inngest event
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/inngest`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: 'sendRemindersUntilResponse',
  //       data: {
  //         userId: 'user_2L53333333333333333333333',
  //       },
  //     }),
  //   });
  // }, []);





  return (
    <main style={{ padding: 20 }}>
      <h1 className="text-6xl font-bold">Public Page</h1>

      <p>This page fetches data from /api/public</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
     
    </main>
  );

}
