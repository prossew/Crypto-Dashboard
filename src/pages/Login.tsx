import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  async function handleLogin() {
    try {
      const response = await axios.post(
        "https://crypto-dashboard-pu7n.onrender.com/auth/login",
        {
          email,
          password,
        },
      );
      setToken(response.data.token);
      navigate("/");
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
        <Link
          to="/register"
          className="text-sm text-center text-muted-foreground"
        >
          Нет аккаунта? Зарегистрироваться
        </Link>
      </Card>
    </div>
  );
}

export default Login;
