"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  User,
  Mail,
  Newspaper,
  TrendingUp
} from "lucide-react";
import { logout } from "@/lib/auth";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: TrendingUp,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Building,
  },
  {
    title: "Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: FileText,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminNavBar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">ODL</span>
              </div>
              <span className="font-semibold">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@debuild.co.ke
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
