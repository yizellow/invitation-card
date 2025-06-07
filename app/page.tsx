"use client";
import { useEffect, useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Letter3DSwap from "@/fancy/components/text/letter-3d-swap";
import { useUserStore } from "@/stores/useUserStore";
import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";
import { AnimatePresence, motion } from "motion/react";
import BreathingText from "@/fancy/components/text/breathing-text";
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import AnimatedPathText from "@/fancy/components/text/text-along-path";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  const router = useRouter();
  const email = useUserStore((state) => state.email);
  const name = useUserStore((state) => state.username);

  // const [debug, setDebug] = useState(false);

  // ✅ 日期與留言狀態
  const availableDates = [
    "6/22（六）",
    "6/29（六）",
    "7/6（六）",
    "7/13（六）",
  ];
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("selectedDates");
    if (saved) setSelectedDates(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
  }, [selectedDates]);

  const handleDateToggle = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  // ✅ 用 useMemo 確保每次渲染時位置不會變動
  const floatingNames = useMemo(() => {
    return ["aa", "bb", "cc"].map((name, index) => {
      const randomX = `${Math.floor(Math.random() * 90)}%`;
      const randomY = `${Math.floor(Math.random() * 90)}%`;
      return { name, x: randomX, y: randomY, id: index };
    });
  }, []);

  // ✅ 登入驗證
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6 w-screen h-screen flex flex-col justify-start items-center">
      <div className="w-dvw h-dvh text-5xl sm:text-7xl md:text-9xl flex flex-row gap-12 items-center justify-center font-overused-grotesk bg-[#303030]">
        <div className="flex flex-col items-center justify-center text-white">
          <BreathingText
            label="Login Success!"
            staggerDuration={0.1}
            fromFontVariationSettings="'wght' 100, 'slnt' 0"
            toFontVariationSettings="'wght' 800, 'slnt' -10"
          />
        </div>
      </div>

      <h1 className="text-xl font-bold">歡迎你，{name} 主頁面</h1>

      <div className="w-dvw h-dvh text-sm bg-white  sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex flex-col items-start justify-center font-overused-grotesk p-10 md:p-16 lg:p-24 text-[#0015ff] tracking-wide uppercase">
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.025}
          staggerFrom="first"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
          }}
        >
          {`我邀請的人很少，所以我希望大家都可以到 👋`}
        </VerticalCutReveal>
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.025}
          staggerFrom="last"
          reverse={true}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
            delay: 0.5,
          }}
        >
          {`我很認真的跟你說，我八月要去歐洲了😊 `}
        </VerticalCutReveal>
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.025}
          staggerFrom="center"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
            delay: 1.1,
          }}
        >
          {`如果你這次見不到，你這輩子可能看不見我了。🌤️`}
        </VerticalCutReveal>
      </div>

      <p className="mt-2 font-bold">
        一人帶一菜，跟酒水，要不然真的沒有東西吃。
      </p>

      {/* ✅ 日期選擇卡片 */}
      <Card className="w-3/4 h-auto mt-2">
        <CardHeader>
          <CardTitle>你可以的時間點？</CardTitle>
          <CardDescription>
            我希望大家都可以來，所以選多一點吧。
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {availableDates.map((date) => (
              <label key={date} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDates.includes(date)}
                  onChange={() => handleDateToggle(date)}
                />
                <span>{date}</span>
              </label>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            你選的日期：
            {selectedDates.length ? selectedDates.join("、") : "尚未選擇"}
          </p>
        </CardContent>
      </Card>

      {/* ✅ 留言卡片 */}
      <Card className="w-3/4 min-h-1/3 mt-2">
        <CardHeader>
          <CardTitle>哎～</CardTitle>
          <CardDescription>亦澤想你了。</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="留言給亦澤吧！或想備註什麼？"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ✅ 送出按鈕區塊 */}
      <div className="mt-6">
        <Button
          onClick={() => {
            if (!selectedDates.length && !message) {
              alert("請至少填寫可參加日期或留言！");
              return;
            }

            emailjs
              .send(
                "service_gjlixmo", // ⬅️ 請替換成你自己的
                "template_vn4j6wo", // ⬅️ 請替換成你自己的
                {
                  dates: selectedDates.join(", "),
                  message,
                  email: email || "匿名",
                  name: name || "匿名",
                },
                "6Qm2XHYDWXKZXzGhF" // ⬅️ 請替換成你自己的
              )
              .then(() => {
                alert("✅ 已寄出，亦澤收到你了！");
                setMessage("");
                setSelectedDates([]);
                localStorage.removeItem("selectedDates");
              })
              .catch((error) => {
                console.error("寄信失敗：", error);
                alert("❌ 寄信失敗，請稍後再試");
              });
          }}
        >
          送出
        </Button>
      </div>

      {/* ✅ 浮動動畫元素 */}
      {/* <Gravity>
        {floatingNames.map(({ name, x, y, id }) => (
          <MatterBody key={id} x={x} y={y}>
            <div>{name}</div>
          </MatterBody>
        ))}
      </Gravity> */}
    </div>
  );
}
