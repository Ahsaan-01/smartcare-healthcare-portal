import React from 'react';
import {
  TrendingUp,
  Download,
  Building2,
  Calendar,
  Users,
  Video,
  ShieldCheck
} from 'lucide-react';
import { MOCK_PLATFORM_METRICS } from '../../data/mockAdminData';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';

export const AdminAnalyticsPage: React.FC = () => {
  const { addToast } = useToastStore();
  const metrics = MOCK_PLATFORM_METRICS;

  const handleExportCSV = () => {
    const headers = 'Month,Consultations Count,Gross Merchandise Value PKR,Platform Revenue PKR (10% Take)\n';
    const rows = metrics.monthlyGrowth
      .map((r) => `"${r.month}",${r.consultations},${r.gmvPKR},${r.platformRevenuePKR}`)
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SmartCare_Platform_Financial_Statement_PKR.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      message: 'Nationwide platform financial statement exported as CSV.'
    });
  };

  const maxGMV = Math.max(...metrics.monthlyGrowth.map((m) => m.gmvPKR));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Platform Financial & Operational Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Macro-level revenue metrics in Pakistani Rupees (PKR), GMV growth, and city volume distributions.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="border-slate-700 hover:bg-slate-800 text-slate-200"
          leftIcon={<Download className="w-4 h-4 text-amber-400" />}
        >
          Export Financial Audit (CSV)
        </Button>
      </div>

      {/* 4 Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gross Platform GMV
            </span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            Rs. {metrics.grossMerchandiseValuePKR.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold">+18.5% YoY Growth</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              SmartCare Net Commission (10%)
            </span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400">
            Rs. {metrics.netPlatformRevenuePKR.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400">Net platform earnings</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Consultations
            </span>
            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {metrics.totalAppointmentsCount.toLocaleString()} Sessions
          </div>
          <p className="text-[10px] text-slate-400">Physical & TeleHealth</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Average Consultation Fee
            </span>
            <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            Rs. {metrics.averageConsultationFeePKR.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400">Across 12+ specialties</p>
        </div>
      </div>

      {/* 6-Month GMV Growth Chart */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              6-Month Nationwide GMV Trajectory (PKR)
            </h3>
            <p className="text-xs text-slate-400">
              Monthly gross booking volume and 10% platform revenue commission across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-amber-400" />
              <span className="font-semibold text-slate-300">Gross Volume (GMV)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span className="font-semibold text-slate-300">Platform Take Rate</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 sm:h-72 flex items-end justify-between gap-4 pt-6 px-2">
          {metrics.monthlyGrowth.map((item) => {
            const barHeight = Math.round((item.gmvPKR / maxGMV) * 100);

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                <span className="text-[10px] font-bold text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Rs. {(item.gmvPKR / 1000).toFixed(0)}k
                </span>

                <div className="w-full max-w-[52px] bg-slate-800 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${barHeight}%` }}
                    className="w-full bg-gradient-to-t from-amber-500 to-amber-400 transition-all duration-500 group-hover:brightness-110"
                    title={`GMV: Rs. ${item.gmvPKR.toLocaleString()} (Take: Rs. ${item.platformRevenuePKR.toLocaleString()})`}
                  />
                </div>

                <span className="text-[11px] font-medium text-slate-400 truncate max-w-[65px] text-center">
                  {item.month.replace(' 2026', '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Col Grid: City Share & Modality Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City Volume Breakdown */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Regional Market Share by Major City</span>
          </h3>

          <div className="space-y-3">
            {metrics.cityBreakdown.map((city) => (
              <div key={city.city} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{city.city}</span>
                  <span className="font-bold text-white">
                    {city.appointmentCount} consultations ({city.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div
                    style={{ width: `${city.percentage}%` }}
                    className="bg-amber-400 h-2.5 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-slate-400">
                  Est. City Volume: Rs. {Math.round((metrics.grossMerchandiseValuePKR * city.percentage) / 100).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modality Split */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-400" />
            <span>Consultation Delivery Modality</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">In-Clinic Physical Consultations</span>
                <span className="font-bold text-amber-400">71% (1,107 Consults)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full w-[71%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                Dominant format in Clifton, DHA Karachi, Gulberg Lahore, and Blue Area Islamabad.
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Encrypted Online Video Tele-Health</span>
                <span className="font-bold text-emerald-400">29% (453 Consults)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full w-[29%]" />
              </div>
              <p className="text-[11px] text-slate-400">
                10% online patient discount incentive driving tele-health adoption nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
