"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Brain, 
  LayoutDashboard, 
  BrainCircuit, 
  Layers, 
  BookOpen, 
  UserCircle,
  LogOut,
  Bot,
  FileSpreadsheet
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { signOut } from "@/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const links = [
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/analyze", label: "Analyze Problem", Icon: BrainCircuit },
    { href: "/buddy", label: "Btech Buddy", Icon: Bot, badge: "AI" },
    { href: "/patterns", label: "Pattern Library", Icon: Layers },
    { href: "/sheet", label: "450 DSA", Icon: FileSpreadsheet, badge: "NEW" },
    { href: "/vault", label: "My Vault", Icon: BookOpen },
    { href: "/profile", label: "My Profile", Icon: UserCircle },
  ];

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="fixed inset-y-0 left-0 w-[240px] bg-[#0a0a0f] border-r border-[#1e1e2e] flex-col hidden md:flex z-50">
        
        {/* Top Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#1e1e2e]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7c3aed]/20 border border-[#7c3aed]/40">
              <Brain size={18} className="text-[#a78bfa]" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Think<span className="text-[#a78bfa]">DSA</span>
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? "bg-[#7c3aed]/10 text-white border-l-2 border-[#7c3aed] ml-[-2px]" 
                    : "text-[#9ca3af] hover:bg-white/5 hover:text-[#d1d5db]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.Icon size={18} className={isActive ? "text-[#a78bfa]" : "text-[#6b7280]"} />
                  {link.label}
                </div>
                {link.badge && (
                  <span className="bg-[#7c3aed]/20 text-[#d8b4fe] text-[10px] px-1.5 py-0.5 rounded-full font-mono ml-auto">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile / Logout */}
        <div className="p-4 border-t border-[#1e1e2e]">
          <div className="flex flex-col gap-3 px-3 py-2">
            <div className="text-sm font-medium text-[#d1d5db] truncate">
              {user?.email || "Loading..."}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-white transition-colors text-left"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-[#1e1e2e] z-50 flex justify-around items-center h-16 px-2 pb-safe">
        {links.slice(0, 5).map((link) => { // Only show top 5 links on mobile to avoid crowding
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-[#a78bfa]" : "text-[#6b7280]"
              }`}
            >
              <link.Icon size={20} className={isActive ? "text-[#a78bfa]" : "text-[#6b7280]"} />
              <span className="text-[10px] font-medium tracking-tight">
                {link.label.split(" ")[0]} {/* Shorten label for mobile */}
              </span>
            </Link>
          );
        })}
        {/* Mobile Profile/Menu Trigger */}
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            pathname === "/profile" ? "text-[#a78bfa]" : "text-[#6b7280]"
          }`}
        >
          <UserCircle size={20} className={pathname === "/profile" ? "text-[#a78bfa]" : "text-[#6b7280]"} />
          <span className="text-[10px] font-medium tracking-tight">Profile</span>
        </Link>
      </nav>
    </>
  );
}
