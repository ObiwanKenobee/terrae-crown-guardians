import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserType } from "@/types/auth";

interface SmartDashboardLinkProps {
  children: React.ReactNode;
  className?: string;
  fallbackHref?: string;
}

const SmartDashboardLink = ({ children, className, fallbackHref = "/dashboard-selector" }: SmartDashboardLinkProps) => {
  const { user, isAuthenticated } = useAuth();

  const getDashboardRoute = (userType: UserType): string => {
    const routes: Record<UserType, string> = {
      individual_steward: "/steward-dashboard",
      indigenous_guardian: "/indigenous-guardian-dashboard",
      researcher: "/researcher-dashboard",
      ngo_partner: "/ngo-dashboard", 
      youth_steward: "/youth-dashboard",
      corporate_partner: "/corporate-dashboard",
      government_official: "/government-dashboard"
    };

    return routes[userType] || fallbackHref;
  };

  const targetHref = isAuthenticated && user?.user_type 
    ? getDashboardRoute(user.user_type)
    : fallbackHref;

  return (
    <Link to={targetHref} className={className}>
      {children}
    </Link>
  );
};

export default SmartDashboardLink;
