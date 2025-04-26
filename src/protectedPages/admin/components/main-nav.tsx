
// import Link from "next/link"
// import { usePathname } from "next/navigation"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function MainNav() {

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link to="/" className="text-xl font-bold">
        Alumni Connect
      </Link>
      <Link
        to="/admin"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          // pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        to="/admin/alumni-requests"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          // pathname === "/alumni-requests" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Alumni Requests
      </Link>
      <Link
        to="/admin/add-member"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          // pathname === "/add-member" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Add Member
      </Link>
      <Link
        to="/admin/feeds"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          // pathname === "/add-member" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Feeds
      </Link>
      <Link
        to="/admin/create-community"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          // pathname === "/add-member" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Create Community
      </Link>
    </nav>
  )
}

