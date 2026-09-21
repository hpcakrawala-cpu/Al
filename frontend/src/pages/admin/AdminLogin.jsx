import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, ArrowRight } from "lucide-react";
import { ADMIN_CREDENTIALS } from "../../mock";
import { setAuth } from "../../lib/storage";
import Logo from "../../components/Logo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
      setAuth(true);
      navigate("/admin");
    } else {
      toast({ title: "Login gagal", description: "Username atau password salah." });
    }
  };

  return (
    <div className="min-h-screen hero-radial grid place-items-center px-5">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/"><Logo size={60} /></Link>
        </div>
        <div className="card-dark rounded-2xl p-8">
          <h1 className="font-display font-extrabold text-white text-2xl text-center">Panel Admin</h1>
          <p className="text-slate-400 text-center text-sm mt-2">Masuk untuk mengelola invoice & kwitansi</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Username</label>
              <div className="relative mt-1.5">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="admin" className="pl-10 h-12 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500" />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300">Password</label>
              <div className="relative mt-1.5">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••" className="pl-10 h-12 bg-[#0a152b] border-[#4facfe]/20 text-white placeholder:text-slate-500" />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] hover:from-[#3f8bff] hover:to-[#2f6fe8] text-white font-semibold gap-2">
              Masuk <ArrowRight size={18} />
            </Button>
          </form>
          <p className="text-center text-slate-500 text-xs mt-6">Demo: admin / admin88</p>
        </div>
      </div>
    </div>
  );
}
