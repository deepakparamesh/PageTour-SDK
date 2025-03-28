import { PageTourOptions } from '../models/pagetouroptions'
import { PageContext } from '../models/pagecontext'

class ConfigStore {
  private options: PageTourOptions
  private defaultOptions: PageTourOptions = {
    autoPlayDelay: 5000,
    tourStartDelayInMs: 500,
    exportFeatureFlag: true,
    autoPlayEnabled: true,
    isCoverPageTourStart: false,
    theme: {
      primaryColor: '#0063b1',
      secondaryColor: '#fdfdfd',
      textColor: '#252423',
      navigationButtonColor: '#0063b1',
      isRounded: false,
    },
    navigator: {
      navigateToContext: (context: PageContext) => {
        const url = `${location.origin}${context.url}`
        if (location.href.startsWith(url)) {
          return
        }
        const newUrl = window.location.protocol + '//' + window.location.host + context.url
        if (window.location.href !== newUrl) {
          window.location.href = newUrl
        }
      },
      getCurrentPageContext: (): PageContext => {
        let context: PageContext
        const pageUrl = window.location.href
          .replace(window.location.host, '')
          .replace(window.location.protocol + '//', '')

        context.state = pageUrl
        context.url = pageUrl
        return context
      },
    },
    tokenProvider: {
      acquireToken: () => {
        return null
      },
    },
    userActionProvider: {
      recordUserAction: (tutorial: any, userAction: string, step: string, operation: string) => {
        //'record user action function not implemented'
        return null
      },
    },
    userInfo: {
      getCurrentUser: () => {
        //'Please Provide userInfo.getCurrentUser function in the configuration'
        return ''
      },
      getCurrentUserPermissions: () => {
        //'Please Provide userInfo.getCurrentUserPermissions function in the configuration'
        return ['admin']
      },
    },
    tags: {
      includedTags: [],
      excludedTags: [],
    },
  }
  constructor(options: PageTourOptions) {
    this.extendOptions(options)
  }
  public get Options(): PageTourOptions {
    return this.options
  }
  private extendOptions = (inputOptions: PageTourOptions): PageTourOptions => {
    return (this.options = { ...this.defaultOptions, ...inputOptions })
  }
}

export { ConfigStore }
