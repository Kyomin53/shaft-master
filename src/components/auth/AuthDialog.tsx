"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";

export function AuthDialog() {
  const { isAuthDialogOpen, setAuthDialogOpen } = useAuthStore();
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetState = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setErrorMsg("");
  };

  const handleOpenChange = (open: boolean) => {
    setAuthDialogOpen(open);
    if (!open) {
      setTimeout(() => {
        resetState();
        setMode("signin");
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName || email)}`,
            }
          }
        });
        
        if (error) throw error;
        
        if (data.session) {
          setAuthDialogOpen(false); // 가입 즉시 로그인된 경우
        } else {
          // 이메일 확인이 필요한 경우
          setErrorMsg("이메일로 확인 링크를 발송했습니다. 이메일을 확인해주세요.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message === "Invalid login credentials") {
             throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
          }
          throw error;
        }

        setAuthDialogOpen(false); // 로그인 성공
      }
    } catch (err: any) {
      setErrorMsg(err.message || "오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden border-none golf-shadow-xl bg-white">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-emerald-700 h-28 relative flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        
        <div className="p-8 pt-6">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">
              {mode === "signin" ? "시작하기" : "회원가입"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-bold text-sm">
              {mode === "signin" 
                ? "계정에 로그인하고 피팅 데이터를 저장하세요." 
                : "몇 가지 정보만 입력하면 나만의 피팅 비서를 만날 수 있어요."}
            </DialogDescription>
          </DialogHeader>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl mb-4 text-center border border-red-100">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
               <div className="space-y-1.5">
                 <Label className="text-[10px] font-black uppercase text-primary/60 tracking-widest pl-1">Name</Label>
                 <div className="relative">
                   <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <Input 
                     type="text" 
                     placeholder="홍길동" 
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                     className="pl-10 h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-bold"
                     required={mode === "signup"}
                   />
                 </div>
               </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-primary/60 tracking-widest pl-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-bold"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-primary/60 tracking-widest pl-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-bold"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl font-black text-white bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === "signin" ? (
                "로그인"
              ) : (
                "계정 만들기"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setErrorMsg("");
              }}
              className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors underline underline-offset-4"
            >
              {mode === "signin" 
                ? "아직 계정이 없으신가요? 회원가입" 
                : "이미 계정이 있으신가요? 로그인"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
