import { LoginForm } from "@/components/login-form";
import ThreeBackground from "@/components/ThreeBackground";

export default function Page() {
  return (
    <div className="  h-screen w-screen flex items-center justify-center ">
      {/* 背景在下層 */}
      <ThreeBackground />

      <div className="fixed z-50 w-full max-w-sm p-5">
        <LoginForm />
      </div>
    </div>
  );
}
