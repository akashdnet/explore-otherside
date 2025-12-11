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
import Image from "next/image";
import Link from "next/link";


const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
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
        if (res?.success && res?.data) {
          setUser(res.data.profile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);


  let role = 0
  if (user?.role == "user") {
    role = 0
  } else {
    role = 1
  }



  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden">
                {loading ? (
                  <Link href="/">
                    <GalleryVerticalEnd className="size-4" />
                  </Link>
                ) : user?.photo ? (
                  <Image
                    src={user.photo}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <Link href="/">
                    <GalleryVerticalEnd className="size-4" />
                  </Link>
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
