'use client';

import dynamic from 'next/dynamic';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';
import ViewerSidebar from './_components/ViewerSidebar';

import useAccessToken from '@/hooks/useAccessToken';
import useUserCachingSettings from '@/hooks/useUserCachingSettings';
import DbManager from '@/lib/DbManager';

import type { Scan } from '@/types/appointments.type';

const ViewerToolbar = dynamic(() => import('./_components/ViewerToolbar'), {
  ssr: false,
});
const Viewers = dynamic(() => import('./_components/Viewers'), { ssr: false });

interface ViewerPageProps {
  params: {
    scanId: string;
  };
}
export default function ViewerPage({ params: { scanId } }: ViewerPageProps) {
  const accessToken = useAccessToken();
  const cachingSettings = useUserCachingSettings();

  const { data: scan, isLoading } = useQuery({
    queryKey: [`scan_${scanId}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/scans/${scanId}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data as Scan;
      data.study.series.sort((a, b) => a.seriesNumber - b.seriesNumber);
      data.study.series.forEach((series) => {
        series.instances.sort((a, b) => a.instanceNumber - b.instanceNumber);
      });

      if (cachingSettings && cachingSettings.enableDicomCaching) {
        await DbManager.checkAndStoreStudy({
          studyId: data.study.studyInstanceUID,
          series: data.study.series.map((series) => ({
            seriesId: series.seriesInstanceUID,
            instances: series.instances.map((instance) => instance.url),
          })),
        });
      }
      return data as Scan;
    },
    enabled: !!accessToken && !!cachingSettings,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <SidebarProvider
      // defaultOpen={false}
      className="h-full w-full overflow-x-hidden"
    >
      <ViewerSidebar isLoading={isLoading} series={scan?.study.series || []} />
      <div className="flex w-full flex-col overflow-x-hidden overflow-y-hidden">
        {!isLoading && scan && <ViewerToolbar study={scan.study} />}
        {!isLoading && scan && <Viewers study={scan.study} />}
      </div>
    </SidebarProvider>
  );
}
