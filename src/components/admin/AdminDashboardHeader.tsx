import { LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboardTabs, { AdminTab } from "@/components/admin/AdminDashboardTabs";

interface AdminDashboardHeaderProps {
  activeTab: AdminTab;
  title: string;
  description: string;
  newLabel: string;
  onNew: () => void;
  onLogout: () => void;
}

const AdminDashboardHeader = ({
  activeTab,
  title,
  description,
  newLabel,
  onNew,
  onLogout,
}: AdminDashboardHeaderProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:w-auto">
          <AdminDashboardTabs activeTab={activeTab} />
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white lg:w-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1
            className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl"
            style={{ color: "#01002A" }}
          >
            {title}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#01002A" }}>
            {description}
          </p>
        </div>
        <Button
          onClick={onNew}
          className="w-full bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white lg:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          {newLabel}
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
