import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log("Ошибка регистрации", error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Зарегистрироваться</h1>
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
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Пароль"
        />
        <Button onClick={handleRegister} className="w-full">
          Войти
        </Button>
      </Card>
    </div>
  );
}

export default Register;
