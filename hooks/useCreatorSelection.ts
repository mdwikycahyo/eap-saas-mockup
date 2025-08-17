import { useState, useMemo } from "react";
import { Creator, CreatorFilters, PaginationState } from "@/types/campaign";

interface UseCreatorSelectionProps {
  creators: Creator[];
  selectedCreators: Set<number>;
  onSelectionChange: (creatorId: number, checked: boolean) => void;
}

export function useCreatorSelection({
  creators,
  selectedCreators,
  onSelectionChange,
}: UseCreatorSelectionProps) {
  const [filters, setFilters] = useState<CreatorFilters>({
    province: "all",
    city: "all",
    searchTerm: "",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 5,
  });

  // Filter creators based on filters
  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      const matchesProvince = filters.province === "all" || creator.province === filters.province;
      const matchesCity = filters.city === "all" || creator.city === filters.city;
      const matchesSearch =
        creator.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        creator.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        creator.city.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesProvince && matchesCity && matchesSearch;
    });
  }, [creators, filters]);

  // Paginate filtered creators
  const totalPages = Math.ceil(filteredCreators.length / pagination.itemsPerPage);
  const paginatedCreators = filteredCreators.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  // Check if all current page creators are selected
  const areAllCurrentPageSelected = paginatedCreators.every(creator => 
    selectedCreators.has(creator.id)
  );

  // Handle select all creators on current page
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allCreatorIds = paginatedCreators.map(creator => creator.id);
      allCreatorIds.forEach(id => onSelectionChange(id, true));
    } else {
      const currentPageIds = paginatedCreators.map(creator => creator.id);
      currentPageIds.forEach(id => onSelectionChange(id, false));
    }
  };

  // Update filter and reset pagination
  const updateFilter = <K extends keyof CreatorFilters>(
    field: K,
    value: CreatorFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Update pagination
  const updatePagination = <K extends keyof PaginationState>(
    field: K,
    value: PaginationState[K]
  ) => {
    setPagination(prev => ({ ...prev, [field]: value }));
    if (field === "itemsPerPage") {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }
  };

  return {
    filters,
    pagination,
    filteredCreators,
    paginatedCreators,
    totalPages,
    areAllCurrentPageSelected,
    updateFilter,
    updatePagination,
    handleSelectAll,
  };
}
