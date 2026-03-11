import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Не получилось", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Вход</h1>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <Button onClick={handleLogin} className="w-full">
          Войти
        </Button>   
      </Card>
    </div>
  );
}

export default Login;
