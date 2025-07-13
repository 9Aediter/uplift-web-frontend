import { create } from 'zustand';
import { fetchFooterData } from '@/lib/api/footer-api';

interface ProcessedContractItem {
  platform: string;
  url: string | null;
}

interface ProcessedServiceItem {
  title: string;
  link: string;
}

interface ProcessedProductItem {
  title: string;
  link: string;
}

interface ProcessedFooterData {
  contract: ProcessedContractItem[];
  services: ProcessedServiceItem[];
  product: ProcessedProductItem | null;
}

interface FooterState {
  rawFooterData: any | null;
  processedFooterData: ProcessedFooterData | null;
  loading: boolean;
  error: string | null;
  fetchFooter: () => Promise<void>;
}

export const useFooterStore = create<FooterState>((set) => ({
  rawFooterData: null,
  processedFooterData: null,
  loading: false,
  error: null,
  fetchFooter: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchFooterData();
      //console.log("Raw data from API (footer-store):", data);
      if (data && data.data) {
        const contractRaw = data.data.Contract && Array.isArray(data.data.Contract) && data.data.Contract.length > 0 ? data.data.Contract[0] : null;
        //console.log("Extracted contractRaw:", contractRaw);
        const processedContract: ProcessedContractItem[] = [];

        if (contractRaw) {
            Object.keys(contractRaw).forEach(key => {
                // ข้าม 'id' และ key อื่นๆ ที่ไม่เกี่ยวข้องกับลิงก์ contract
                if (key === 'id') {
                    return;
                }

                const url = (contractRaw as any)[key];
                // ใช้ชื่อ key จาก API เป็นชื่อ platform โดยตรง
                const platformName = key;
                //console.log(`Processing key: ${key}, url: ${url}, platformName: ${platformName}`);
                processedContract.push({ platform: platformName, url: url });
            });
        }

        // ประมวลผลข้อมูล Services
        //console.log("Starting services processing...");
        const processedServices: ProcessedServiceItem[] = [];
        // ตรวจสอบว่ามี data.data.services และเป็น array
        if (data.data.services && Array.isArray(data.data.services)) {
            //console.log("Found services data in API response:", data.data.services);
            data.data.services.forEach((service: any) => {
                //console.log("Processing service item:", service);
                // ตรวจสอบว่า service item มี title และ slug โดยตรง
                if (service.title && service.slug) {
                    //console.log(`Extracted service: Title - ${service.title}, Slug - ${service.slug}`);
                    processedServices.push({
                        title: service.title,
                        link: `/services/${service.slug}`,
                    });
                } else {
                    //console.log("Service item missing title or slug:", service);
                }
            });
        } else {
            //console.log("No services data found or invalid structure in data.data.services");
        }
        //console.log("Processed services array:", processedServices);

        // ประมวลผลข้อมูล Product
        let processedProduct: ProcessedProductItem | null = null;
        if (data.data.product && data.data.product.title && data.data.product.slug) {
            processedProduct = {
                title: data.data.product.title,
                link: `/products/${data.data.product.slug}`,
            };
        }

        //console.log("Processed contract array:", processedContract);
        const processedData: ProcessedFooterData = {
            contract: processedContract,
            services: processedServices,
            product: processedProduct,
        };
        //console.log("Final processed data (footer-store):", processedData);

        set({ rawFooterData: data, processedFooterData: processedData, loading: false });
      } else {
        set({ rawFooterData: data, processedFooterData: null, loading: false, error: "Invalid data structure or missing data" });
      }
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));

