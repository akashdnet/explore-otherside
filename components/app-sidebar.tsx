"use client";

import { logoutUser } from "@/actions/auth";
import { getMyProfile } from "@/actions/user";
import { GalleryVerticalEnd, LogOut } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";


const data = {
  navMain: [
    {
      title: "User Management",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Trip Management",
          url: "/dashboard/my-trip-management",
        },
        {
          title: "Profile",
          url: "/profile/me",
        },
      ],
    },
    {
      title: "Guide Management",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard/guide-overview",
        },
        {
          title: "Trip Management",
          url: "/dashboard/guide-trip-management",
        },
        {
          title: "Profile",
          url: "/profile/me",

        },

      ],
    },
    {
      title: "Admin Management",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "User Management",
          url: "/dashboard/user-management",
        },
        {
          title: "Trip Management",
          url: "/dashboard/all-trip-management  ",
        },
        {
          title: "Profile",
          url: "/profile/me",

        },

      ],
    },


  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMyProfile();
        if (res?.success) {
          setUser(res.data?.profile || res.data || null);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const role = user?.role === "admin" ? 2 : user?.role === "guide" ? 1 : 0;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden">
                {user?.photo ? (
                  <img
                    src={user.photo.startsWith('http') ? user.photo : `http://localhost:8000/uploads/${user.photo.split(/[\\/]/).pop()}`}
                    alt={user.name || "User"}
                    className="size-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://github.com/shadcn.png";
                    }}
                  />
                ) : (
                  <GalleryVerticalEnd className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-lg">
                  {loading ? "Loading..." : user?.name || "No data found."}
                </span>
                <span className="truncate text-xs">
                  {loading ? "..." : user?.email || "no data found!"}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {/* {data.navMain[role].map((item) => ( */}
        <SidebarGroup key={role}>
          <SidebarGroupLabel className="text-xl font-semibold">{data.navMain[role].title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain[role].items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* ))} */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-red-500 flex justify-center items-center text-white font-semibold hover:bg-red-600 hover:text-white"
              onClick={async () => {
                await logoutUser();
                window.location.href = "/login";
              }}
            >
              <LogOut />
              <span className="">Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
