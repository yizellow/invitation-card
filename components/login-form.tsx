"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/useUserStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const setUsernameStore = useUserStore((state) => state.setUsername);
  const setEmailStore = useUserStore((state) => state.setEmail);

  // 假設這些是允許登入的使用者名稱清單
  const allowedUsernames = ["黃亦澤", "王小明", "李小華"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (allowedUsernames.includes(username)) {
      setUsernameStore(username); // 儲存 username 到 Zustand
      setEmailStore(email); // 儲存 email 到 Zustand
      localStorage.setItem("token", "true");
      localStorage.setItem("username", username); // 也存 localStorage
      localStorage.setItem("email", email);
      router.push("/");
    } else {
      setError("使用者名稱錯誤，請再試一次～");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>你好，再見，黃亦澤</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="請輸入你的中文名稱"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
