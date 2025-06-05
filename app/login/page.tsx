'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === '123') {
      localStorage.setItem('token', 'true');
      router.push('/');
    } else {
      alert('密碼錯誤！');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>登入頁面</h1>
      <input
        type="password"
        placeholder="請輸入密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>登入</button>
    </div>
  );
}
