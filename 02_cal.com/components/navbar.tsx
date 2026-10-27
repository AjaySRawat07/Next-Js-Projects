"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faChalkboardUser, faComments, faDollarSign, faFlask, faGraduationCap, faPaperPlane, faPhone, faSitemap, faUser, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
    title: string;
    href: string;
    icon: IconDefinition;
    children: React.ReactNode;
  };

  const components: {  title: string; href: string; description: string; icon: IconDefinition; }[] = [
    {
      title: "For Individuals",
      href: "/",
      description: "Personal scheduling made simple",
      icon: faUser
    },
    {
      title: "For Teams",
      href: "/",
      description: "Collaborative scheduling for groups",
      icon: faUsers
    },
    {
      title: "For Organizations",
      href: "/",
      description: "Larger teams scheduling for more control & security",
      icon: faSitemap
    },
    {
      title: "For Enterprises",
      href: "/",
      description: "Enterprise-level scheduling solutions",
      icon: faBuilding
    }
  ];
  const useCaseComponents: { title: string; href: string; icon: IconDefinition; }[] = [
    {
      title: "Recruiting",
      href: "/recruiting",
      icon: faPaperPlane
    },
    {
      title: "Sales",
      href: "/sales",
      icon: faDollarSign
    },
    {
      title: "HR",
      href: "/hr",
      icon: faUserGroup
    },
    {
      title: "Education",
      href: "/education",
      icon: faGraduationCap
    },
    {
      title: "Support",
      href: "/support",
      icon: faPhone
    },
    {
      title: "Healthcare",
      href: "/healthcare",
      icon: faFlask
    },
    {
      title: "Telehealth",
      href: "/telehealth",
      icon: faComments
    },
    {
      title: "Marketing",
      href: "/marketing",
      icon: faChalkboardUser
    }
  ];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2">
                <div>
                <ul className="grid w-[400px] gap-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {components.map((component) => (
                    
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
                </div>
                <div className="">
                <ul className="grid w-[400px] gap-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {useCaseComponents.map((component) => (
                    
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component?.description}
                </ListItem>
              ))}
            </ul>
                </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Enterprise</Link>} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Cal.ai</Link>} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</Link>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
          
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                    
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Pricing</Link>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink>
       <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
          <FontAwesomeIcon
            icon={icon}
            className="size-5 text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">
            {children}
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
