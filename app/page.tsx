"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function HomePage() {
  const router = useRouter();
  const email = useUserStore((state) => state.email);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "true") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">歡迎你，{email}主頁面</h1>
      <p className="mt-2">你已成功登入！</p>
    </div>
  );
}
