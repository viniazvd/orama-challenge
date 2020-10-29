export default {
  data () {
    return {
      smallScreen: window.matchMedia('screen and (max-width: 334px)'),
      mediumScreen: window.matchMedia('screen and (min-width: 335px) and (max-width: 769px)'),
      largeScreen: window.matchMedia('screen and (min-width: 770px) and (max-width: 1023px)'),
      veryLargeScreen: window.matchMedia('screen and (min-width: 1024px)'),

      isSmallScreen: false,
      isMediumScreen: false,
      isLargeScreen: false,
      isVeryLargeScreen: false
    }
  },

  methods: {
    setBreakpoint () {
      this.isSmallScreen = this.smallScreen && this.smallScreen.matches
      this.isMediumScreen = this.mediumScreen && this.mediumScreen.matches
      this.isLargeScreen = this.largeScreen && this.largeScreen.matches
      this.isVeryLargeScreen = this.veryLargeScreen && this.veryLargeScreen.matches
    },

    getIsSmallScreen () {
      return this.isSmallScreen
    },

    getIsMediumScreen () {
      return this.isMediumScreen
    },

    getIsLargeScreen () {
      return this.isLargeScreen
    },

    getIsVeryLargeScreen () {
      return this.isVeryLargeScreen
    },

    onOrientationChange () {
      window.addEventListener('resize', () => {
        const matchMedia = window.matchMedia || (() => {})
        if ((matchMedia('(orientation: portrait)') || {}).matches) {
          setTimeout(() => window.scrollTo(0, 1), 400)
        }
      }, { once: true })
    }
  },

  beforeDestroy () {
    this.smallScreen.removeListener(this.setBreakpoint)
    this.mediumScreen.removeListener(this.setBreakpoint)
    this.largeScreen.removeListener(this.setBreakpoint)
    this.veryLargeScreen.removeListener(this.setBreakpoint)
    window.removeEventListener('orientationchange', this.onOrientationChange)
  },

  mounted () {
    this.smallScreen.addListener(this.setBreakpoint)
    this.mediumScreen.addListener(this.setBreakpoint)
    this.largeScreen.addListener(this.setBreakpoint)
    this.veryLargeScreen.addListener(this.setBreakpoint)
    window.addEventListener('orientationchange', this.onOrientationChange)
    this.setBreakpoint()
  },

  provide () {
    return {
      getIsSmallScreen: this.getIsSmallScreen,
      getIsMediumScreen: this.getIsMediumScreen,
      getIsLargeScreen: this.getIsLargeScreen,
      getIsVeryLargeScreen: this.getIsVeryLargeScreen
    }
  }
}
