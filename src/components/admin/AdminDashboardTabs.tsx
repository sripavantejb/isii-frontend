import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AdminTab = 'pivotal-thinking' | 'press-news' | 'perspectives';

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
    <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
      <Button
        variant="outline"
        onClick={() => navigate('/admin')}
        className={getTabClassName(activeTab === 'pivotal-thinking')}
      >
        Pivotal Thinking
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate('/admin/news-articles')}
        className={getTabClassName(activeTab === 'press-news')}
      >
        Press & News
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
