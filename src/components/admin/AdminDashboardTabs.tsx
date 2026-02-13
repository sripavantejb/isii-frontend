import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AdminTab = 'pivotal-thinking' | 'perspectives';

interface AdminDashboardTabsProps {
  activeTab?: AdminTab;
}

const AdminDashboardTabs = ({ activeTab }: AdminDashboardTabsProps) => {
  const navigate = useNavigate();

  const getTabClassName = (isActive: boolean) =>
    cn(
      'w-full sm:w-auto border-[#01002A]',
      isActive
        ? 'bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white'
        : 'bg-transparent text-[#01002A] hover:bg-[#01002A] hover:text-white'
    );

  return (
    <div className="flex w-full sm:w-auto gap-2">
      <Button
        variant="outline"
        onClick={() => navigate('/admin')}
        className={getTabClassName(activeTab === 'pivotal-thinking')}
      >
        Pivotal Thinking
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate('/admin/reports')}
        className={getTabClassName(activeTab === 'perspectives')}
      >
        Perspectives
      </Button>
    </div>
  );
};

export default AdminDashboardTabs;
