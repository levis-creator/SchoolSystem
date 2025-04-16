import { Icons } from "./Icons";

export type NavItem = {
    name: string;
    icon: React.ElementType;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  };
export type NavItems={
  main:NavItem[];
  others?:NavItem[];
}

 export const navItems:NavItems={
    main:[
      {
        icon: Icons.GridIcon,
        name: "Dashboard",
        path:"/dashboard"
      },
      {
        icon: Icons.CalenderIcon ,
        name: "Calendar",
        path: "/calendar",
      },
      {
        icon: Icons.UserCircleIcon ,
        name: "User Profile",
        path: "/dashboard/profile",
      },
    
      {
        name: "Forms",
        icon: Icons.ListIcon ,
        subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
      },
      {
        name: "Tables",
        icon: Icons.TableIcon ,
        subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
      },
      {
        name: "Pages",
        icon: Icons.PageIcon ,
        subItems: [
          { name: "Blank Page", path: "/blank", pro: false },
          { name: "404 Error", path: "/error-404", pro: false },
        ],
      },
    ],
    others:[
      {
        icon: Icons.PieChartIcon ,
        name: "Charts",
        subItems: [
          { name: "Line Chart", path: "/line-chart", pro: false },
          { name: "Bar Chart", path: "/bar-chart", pro: false },
        ],
      },
      {
        icon: Icons.BoxCubeIcon ,
        name: "UI Elements",
        subItems: [
          { name: "Alerts", path: "/alerts", pro: false },
          { name: "Avatar", path: "/avatars", pro: false },
          { name: "Badge", path: "/badge", pro: false },
          { name: "Buttons", path: "/buttons", pro: false },
          { name: "Images", path: "/images", pro: false },
          { name: "Videos", path: "/videos", pro: false },
        ],
      },
      {
        icon: Icons.PlugInIcon ,
        name: "Authentication",
        subItems: [
          { name: "Sign In", path: "/signin", pro: false },
          { name: "Sign Up", path: "/signup", pro: false },
        ],
      },
    ]
  }
  // admin Navigation
  export const adminItems:NavItems={
    main:[
      {
        icon: Icons.GridIcon,
        name: "Dashboard",
        path:"/dashboard"
      },
      {
        icon: Icons.Boxes ,
        name: "Department",
        path:"/dashboard/department"
      },
      {
        icon: Icons.Library ,
        name: "Courses",
        path: "/dashboard/course",
      },
      {
        icon: Icons.UsersRound ,
        name: "App Users",
        path:"/dashboard/users"
      },
      {
        icon: Icons.GraduationCap ,
        name: "Students",
        path: "/dashboard/student",
      },
      {
        icon: Icons.UserCircleIcon ,
        name: "User Profile",
        path: "/dashboard/profile",
      },

    ],
  }
