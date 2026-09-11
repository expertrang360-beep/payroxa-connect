import React, { createContext, useContext, useEffect, useState } from "react";
import { getPublicPublishedSiteDataFn } from "../api";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_APPLICATION_LINKS,
  DEFAULT_HERO_CONTENT,
  INITIAL_CMS_DATABASE,
} from "../constants";
import type {
  SiteSettings,
  ApplicationLinks,
  SocialSettings,
  HeroContent,
  ProductItem,
  BusinessTypeItem,
  FaqItem,
  AnnouncementItem,
  NavigationItem,
} from "../types";

interface PublicCmsContextType {
  settings: SiteSettings;
  links: ApplicationLinks;
  social: SocialSettings;
  navigation: NavigationItem[];
  hero: HeroContent;
  trustStrip: any;
  products: ProductItem[];
  businessTypes: BusinessTypeItem[];
  storeSection: any;
  walletSection: any;
  dashboardSection: any;
  securitySection: any;
  howItWorks: any[];
  cardsSection: any;
  faqs: FaqItem[];
  testimonials: any[];
  announcements: AnnouncementItem[];
  activeAnnouncement: AnnouncementItem | null;
  seo: any;
  allSeo: Record<string, any>;
  blogPosts: any[];
  blogCategories: any[];
  blogAuthors: any[];
  isCmsLoaded: boolean;
}

const defaultState: PublicCmsContextType = {
  settings: DEFAULT_SITE_SETTINGS,
  links: DEFAULT_APPLICATION_LINKS,
  social: INITIAL_CMS_DATABASE.social,
  navigation: INITIAL_CMS_DATABASE.navigation,
  hero: DEFAULT_HERO_CONTENT,
  trustStrip: INITIAL_CMS_DATABASE.trustStrip,
  products: INITIAL_CMS_DATABASE.products,
  businessTypes: INITIAL_CMS_DATABASE.businessTypes,
  storeSection: INITIAL_CMS_DATABASE.storeSection,
  walletSection: INITIAL_CMS_DATABASE.walletSection,
  dashboardSection: INITIAL_CMS_DATABASE.dashboardSection,
  securitySection: INITIAL_CMS_DATABASE.securitySection,
  howItWorks: INITIAL_CMS_DATABASE.howItWorks,
  cardsSection: INITIAL_CMS_DATABASE.cardsSection,
  faqs: INITIAL_CMS_DATABASE.faqs,
  testimonials: INITIAL_CMS_DATABASE.testimonials,
  announcements: INITIAL_CMS_DATABASE.announcements,
  activeAnnouncement: null,
  seo: INITIAL_CMS_DATABASE.seo.home,
  allSeo: INITIAL_CMS_DATABASE.seo,
  blogPosts: INITIAL_CMS_DATABASE.blogPosts,
  blogCategories: INITIAL_CMS_DATABASE.blogCategories,
  blogAuthors: INITIAL_CMS_DATABASE.blogAuthors,
  isCmsLoaded: false,
};

const PublicCmsContext = createContext<PublicCmsContextType>(defaultState);

export function PublicCmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PublicCmsContextType>(defaultState);

  useEffect(() => {
    let mounted = true;

    async function loadPublishedCms() {
      try {
        const res = await getPublicPublishedSiteDataFn();
        if (res && mounted) {
          const activeAnn = (res.announcements || []).find((a: any) => a.enabled) || null;
          setData({
            settings: res.settings || DEFAULT_SITE_SETTINGS,
            links: res.links || DEFAULT_APPLICATION_LINKS,
            social: res.social || INITIAL_CMS_DATABASE.social,
            navigation: res.navigation || INITIAL_CMS_DATABASE.navigation,
            hero: res.hero || DEFAULT_HERO_CONTENT,
            trustStrip: res.trustStrip || INITIAL_CMS_DATABASE.trustStrip,
            products: res.products || INITIAL_CMS_DATABASE.products,
            businessTypes: res.businessTypes || INITIAL_CMS_DATABASE.businessTypes,
            storeSection: res.storeSection || INITIAL_CMS_DATABASE.storeSection,
            walletSection: res.walletSection || INITIAL_CMS_DATABASE.walletSection,
            dashboardSection: res.dashboardSection || INITIAL_CMS_DATABASE.dashboardSection,
            securitySection: res.securitySection || INITIAL_CMS_DATABASE.securitySection,
            howItWorks: res.howItWorks || INITIAL_CMS_DATABASE.howItWorks,
            cardsSection: res.cardsSection || INITIAL_CMS_DATABASE.cardsSection,
            faqs: res.faqs || INITIAL_CMS_DATABASE.faqs,
            testimonials: res.testimonials || INITIAL_CMS_DATABASE.testimonials,
            announcements: res.announcements || INITIAL_CMS_DATABASE.announcements,
            activeAnnouncement: activeAnn,
            seo: res.seo || INITIAL_CMS_DATABASE.seo.home,
            allSeo: res.allSeo || INITIAL_CMS_DATABASE.seo,
            blogPosts: res.blogPosts || INITIAL_CMS_DATABASE.blogPosts,
            blogCategories: res.blogCategories || INITIAL_CMS_DATABASE.blogCategories,
            blogAuthors: res.blogAuthors || INITIAL_CMS_DATABASE.blogAuthors,
            isCmsLoaded: true,
          });
        }
      } catch (err) {
        // Fallback to static defaults gracefully
        console.warn("Using fallback static configuration:", err);
      }
    }

    loadPublishedCms();

    return () => {
      mounted = false;
    };
  }, []);

  return <PublicCmsContext.Provider value={data}>{children}</PublicCmsContext.Provider>;
}

export function usePublicCms() {
  return useContext(PublicCmsContext);
}
