// Actions that are dispatched specifically for analytics purposes

export const ANALYTICS_ONBOARDING_STEP = 'ANALYTICS_ONBOARDING_STEP'
export const ANALYTICS_PAGE_VIEW = 'ANALYTICS_PAGE_VIEW'

export type AnalyticsAction = {
  type: string
  props: {[key: string]: string | number | boolean | undefined} // props being sent to mix panel
}

export function analyticsOnboardingStep(
  title: string,
  index: number,
  isEnd: boolean = false
): AnalyticsAction {
  return {
    type: ANALYTICS_ONBOARDING_STEP,
    props: {
      index,
      title,
      isEnd,
    },
  }
}

export function analyticsPageView(
  pathname: string,
  search: string,
  hash: string
): AnalyticsAction {
  return {
    type: ANALYTICS_PAGE_VIEW,
    props: {
      pathname,
      search,
      hash,
    },
  }
}
