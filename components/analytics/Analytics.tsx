"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics tracking
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Event tracking utilities
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Predefined tracking events
export const analytics = {
  // Contact form events
  contactFormSubmitted: (projectType: string) => {
    trackEvent('contact_form_submit', {
      project_type: projectType,
      event_category: 'engagement',
      event_label: 'contact_form'
    });
  },

  // Newsletter events
  newsletterSubscribed: () => {
    trackEvent('newsletter_signup', {
      event_category: 'engagement',
      event_label: 'newsletter'
    });
  },

  // Project viewing events
  projectViewed: (projectSlug: string, projectTitle: string) => {
    trackEvent('project_view', {
      project_slug: projectSlug,
      project_title: projectTitle,
      event_category: 'engagement',
      event_label: 'project_gallery'
    });
  },

  // Service inquiry events
  serviceInquired: (serviceName: string) => {
    trackEvent('service_inquiry', {
      service_name: serviceName,
      event_category: 'engagement',
      event_label: 'services'
    });
  },

  // Blog events
  blogPostViewed: (postSlug: string, postTitle: string) => {
    trackEvent('blog_post_view', {
      post_slug: postSlug,
      post_title: postTitle,
      event_category: 'engagement',
      event_label: 'blog'
    });
  },

  // Download events
  fileDownloaded: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      event_category: 'engagement',
      event_label: 'downloads'
    });
  },

  // Search events
  searchPerformed: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      event_category: 'engagement',
      event_label: 'search'
    });
  },

  // Appointment booking events
  appointmentBooked: (serviceType: string) => {
    trackEvent('appointment_booked', {
      service_type: serviceType,
      event_category: 'conversion',
      event_label: 'appointments'
    });
  }
};

// Extend window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
