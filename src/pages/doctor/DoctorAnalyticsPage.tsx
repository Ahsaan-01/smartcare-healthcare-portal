import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  Users,
  Building2,
  Video,
  Star,
  Clock,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { MOCK_DOCTOR_ANALYTICS } from '../../data/mockDoctorPortal';
import { useToastStore } from '../../store/useToastStore';
import { Button } from '../../components/common/Button';

export const DoctorAnalyticsPage: React.FC = () => {
  const { addToast } = useToastStore();
  const [selectedRange, setSelectedRange] = useState<'this-month' | 'last-30' | 'quarter' | 'year'>('this-month');

  const analytics = MOCK_DOCTOR_ANALYTICS;

  const handleExportCSV = () => {
    // Generate CSV content in PKR
    const headers = 'Month,In-Clinic Revenue (PKR),Online Revenue (PKR),Total Gross (PKR),Net Payout (PKR)\n';
    const rows = analytics.revenueTrend
      .map(
        (r) =>
          `"${r.month}",${r.inClinic},${r.online},${r.total},${Math.round(r.total * 0.9)}`
      )
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SmartCare_Dr_Ayesha_Earnings_Report_PKR.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      message: 'Financial revenue statement exported as CSV.'
    });
  };

  // Find max revenue for scaling chart bars
  const maxRevenue = Math.max(...analytics.revenueTrend.map((r) => r.total));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Practice Performance & Revenue Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent revenue statements in PKR, consultation breakdowns, and clinical volume trends.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <select
              value={selectedRange}
              onChange={(e) =>
                setSelectedRange(e.target.value as 'this-month' | 'last-30' | 'quarter' | 'year')
              }
              className="bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              <option value="this-month">This Month (Sep 2026)</option>
              <option value="last-30">Last 30 Days</option>
              <option value="quarter">Last Quarter (Q2/Q3)</option>
              <option value="year">Fiscal Year 2026</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 4 Primary Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Gross Revenue (PKR)
            </span>
            <div className="p-2 bg-emerald-50 text-[#0D7A5F] rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            Rs. {analytics.totalGrossRevenuePKR.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <span>+12.4%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* Net Payout */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Net Clinic Payout (90%)
            </span>
            <div className="p-2 bg-emerald-50 text-[#0D7A5F] rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800">
            Rs. {analytics.netPayoutPKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Platform service charge: 10% (Rs. 48,500)
          </p>
        </div>

        {/* Total Consultations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Consultations Completed
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {analytics.totalConsultations} Patients
          </div>
          <p className="text-[11px] text-slate-500">
            {analytics.inClinicConsultations} In-Clinic &bull; {analytics.onlineConsultations} Online
          </p>
        </div>

        {/* Avg Fee */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Avg. Fee / Patient
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            Rs. {analytics.averageConsultationFeePKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            Standard: Rs. 2,500 &bull; Online: Rs. 2,250
          </p>
        </div>
      </div>

      {/* Monthly Revenue Trend Visual Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              6-Month Consultation Revenue Trend (PKR)
            </h3>
            <p className="text-xs text-slate-500">
              Comparative gross earnings from physical in-clinic visits and online tele-consultations.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#0D7A5F]" />
              <span className="font-semibold text-slate-700">In-Clinic Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-300" />
              <span className="font-semibold text-slate-700">Online Video Calls</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 sm:h-72 flex items-end justify-between gap-3 pt-6 px-2">
          {analytics.revenueTrend.map((item) => {
            const inClinicHeight = Math.round((item.inClinic / maxRevenue) * 100);
            const onlineHeight = Math.round((item.online / maxRevenue) * 100);

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                {/* Tooltip on hover */}
                <span className="text-[10px] font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Rs. {(item.total / 1000).toFixed(0)}k
                </span>

                {/* Stacked bar */}
                <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${onlineHeight}%` }}
                    className="w-full bg-emerald-300 transition-all duration-500"
                    title={`Online: Rs. ${item.online.toLocaleString()}`}
                  />
                  <div
                    style={{ height: `${inClinicHeight}%` }}
                    className="w-full bg-[#0D7A5F] transition-all duration-500"
                    title={`In-Clinic: Rs. ${item.inClinic.toLocaleString()}`}
                  />
                </div>

                <span className="text-[11px] font-medium text-slate-600 truncate max-w-[65px] text-center">
                  {item.month.replace(' 2026', '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Grid: Consultation Modality & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modality Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0D7A5F]" />
            <span>Consultation Modality Breakdown</span>
          </h3>

          <div className="space-y-4">
            {/* In-Clinic Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Building2 className="w-4 h-4 text-[#0D7A5F]" />
                  <span>In-Clinic Consultations</span>
                </div>
                <span className="font-bold text-slate-900">
                  121 Patients (72%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-[#0D7A5F] h-3 rounded-full w-[72%]" />
              </div>
              <span className="text-[11px] text-slate-400 block">
                Total In-Clinic Revenue: <strong>Rs. 365,000</strong>
              </span>
            </div>

            {/* Online Video Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>Online Video Consultations</span>
                </div>
                <span className="font-bold text-slate-900">
                  47 Patients (28%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-emerald-400 h-3 rounded-full w-[28%]" />
              </div>
              <span className="text-[11px] text-slate-400 block">
                Total Online TeleHealth Revenue: <strong>Rs. 120,000</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Peak Consultation Hours */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0D7A5F]" />
            <span>Peak Consultation Hours (Pakistan PKT)</span>
          </h3>

          <div className="space-y-3">
            {analytics.peakHours.map((hour) => (
              <div key={hour.timeLabel} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{hour.timeLabel}</span>
                  <span className="font-bold text-slate-900">
                    {hour.patientCount} consults ({hour.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    style={{ width: `${hour.percentage}%` }}
                    className={`h-2 rounded-full ${
                      hour.percentage >= 30 ? 'bg-[#0D7A5F]' : 'bg-emerald-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clinical Conditions & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Diagnosed Conditions */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0D7A5F]" />
            <span>Top Diagnosed Cardiovascular Conditions</span>
          </h3>

          <div className="space-y-3">
            {analytics.topConditions.map((cond) => (
              <div key={cond.condition} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{cond.condition}</span>
                  <span className="font-bold text-[#0D7A5F]">
                    {cond.patientCount} cases ({cond.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    style={{ width: `${cond.percentage}%` }}
                    className="bg-[#0D7A5F] h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Satisfaction Overview */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Patient Ratings & Quality Feedback</span>
          </h3>

          <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900">{analytics.ratingScore}</div>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {analytics.totalReviews} reviews
              </span>
            </div>

            <div className="flex-1 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-500">5 Stars</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full w-[90%]" />
                </div>
                <span className="w-8 text-right font-bold">{analytics.fiveStarCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-500">4 Stars</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-[8%]" />
                </div>
                <span className="w-8 text-right font-bold">{analytics.fourStarCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-500">3 Stars</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full w-[2%]" />
                </div>
                <span className="w-8 text-right font-bold">{analytics.threeStarCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
