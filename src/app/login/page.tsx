"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        setMsg("Sikeres regisztráció és bejelentkezés ✅");
        router.replace("/"); // Siker után irány a védett főoldal
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMsg("Sikeres bejelentkezés ✅");
        router.replace("/"); // Siker után irány a védett főoldal
      }
    } catch (err: any) {
      setMsg(err?.message ?? "Hiba történt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">
          {mode === "login" ? "Bejelentkezés" : "Regisztráció"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Jelszó (min. 6 karakter)"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded px-3 py-2 border"
          >
            {loading
              ? "Feldolgozás..."
              : mode === "login"
              ? "Belépés"
              : "Regisztráció"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-3 text-sm underline"
        >
          {mode === "login"
            ? "Nincs fiókod? Regisztrálj!"
            : "Van fiókod? Jelentkezz be!"}
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </main>
  );
}
