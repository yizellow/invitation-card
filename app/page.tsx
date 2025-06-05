"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "true") {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>主頁面</h1>
      <p>你已成功登入！!</p>
    </div>
  );
}
