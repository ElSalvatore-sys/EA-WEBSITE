// Google Analytics utility functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (url: string, title: string) => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: title,
    page_location: url,
  });
};

// Form submission tracking
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'engagement', formType);
};

// CTA button tracking
export const trackCTAClick = (buttonText: string, location: string) => {
  trackEvent('cta_click', 'engagement', `${buttonText} - ${location}`);
};

// Booking modal tracking
export const trackBookingStep = (step: number) => {
  trackEvent('booking_step', 'conversion', `step_${step}`);
};