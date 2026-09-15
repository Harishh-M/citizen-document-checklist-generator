import React, { useState, useMemo } from 'react';
import { Search, Landmark, ArrowRight, FileText, Calendar, Filter, Sparkles } from 'lucide-react';
import { Service } from '../types.js';

interface ServiceSelectionPageProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  isLoading: boolean;
}

export const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({
  services,
  onSelectService,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'All' | 'State' | 'Central'>('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Helper to determine jurisdiction
  const getJurisdiction = (service: Service): 'State' | 'Central' | 'State/Central' => {
    if (service.jurisdiction) return service.jurisdiction;
    if (service.department.toLowerCase().includes('central') || service.department.toLowerCase().includes('ministry')) {
      return 'Central';
    }
    return 'State';
  };

  // Counts for tabs
  const jurisdictionCounts = useMemo(() => {
    let stateCount = 0;
    let centralCount = 0;
    for (const s of services) {
      const jur = getJurisdiction(s);
      if (jur === 'State') stateCount++;
      else if (jur === 'Central') centralCount++;
      else {
        stateCount++;
        centralCount++;
      }
    }
    return { all: services.length, state: stateCount, central: centralCount };
  }, [services]);

  // Extract unique department filters
  const departments = useMemo(() => {
    const deps = new Set(services.map(s => s.department));
    return ['All', ...Array.from(deps)];
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch =
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      const jur = getJurisdiction(service);
      const matchesJurisdiction =
        selectedJurisdiction === 'All' ||
        jur === selectedJurisdiction ||
        jur === 'State/Central';

      const matchesDept =
        selectedDepartment === 'All' || service.department === selectedDepartment;

      return matchesSearch && matchesJurisdiction && matchesDept;
    });
  }, [services, searchTerm, selectedJurisdiction, selectedDepartment]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Landmark className="w-3.5 h-3.5" />
          <span>Official Public Services Directory ({services.length} Services)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Select Government Service
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
          Browse verified State and Central public services. Select your service to generate an official, personalized document checklist compliant with government regulations.
        </p>
      </div>

      {/* Jurisdiction Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSelectedJurisdiction('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedJurisdiction === 'All'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Services ({jurisdictionCounts.all})
        </button>
        <button
          onClick={() => setSelectedJurisdiction('State')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedJurisdiction === 'State'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70'
          }`}
        >
          <span>State Services</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">{jurisdictionCounts.state}</span>
        </button>
        <button
          onClick={() => setSelectedJurisdiction('Central')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedJurisdiction === 'Central'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-amber-800 bg-amber-50/80 hover:bg-amber-100/80'
          }`}
        >
          <span>Central Services</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">{jurisdictionCounts.central}</span>
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across all 50+ services (e.g., 'GST', 'EWS', 'Trade Licence', 'Patta', 'Passport', 'Aadhaar')..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Department filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5" />
            Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept.split('&')[0].replace('Department of ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-16 bg-slate-100 rounded"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No matching services found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing department filters to browse all available public services.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedDepartment('All'); }}
            className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all p-6 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Jurisdiction and Department tags */}
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5">
                    {getJurisdiction(service) === 'Central' && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200/80">
                        Central
                      </span>
                    )}
                    {getJurisdiction(service) === 'State' && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200/80">
                        State
                      </span>
                    )}
                    {getJurisdiction(service) === 'State/Central' && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200/80">
                        State/Central
                      </span>
                    )}
                    <span className="text-slate-400 font-medium text-[11px]">#{service.id}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                    <Calendar className="w-3 h-3" />
                    {service.last_updated}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-medium line-clamp-1" title={service.department}>
                  {service.department}
                </div>

                {/* Service title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {service.service_name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Eligibility Pill */}
                {service.eligibility && (
                  <div className="text-[11px] bg-slate-50 text-slate-600 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Eligibility: </span>
                    <span className="line-clamp-2">{service.eligibility}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
