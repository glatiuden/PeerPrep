import _ from "lodash";

export default {
  data() {
    return {
      difficulty_chip_colors: {
        easy: "green",
        medium: "orange",
        hard: "red",
      },
      mode_chip_colors: {
        elo: "error",
        question: "success",
      },
    };
  },
  computed: {
    /**
     * @description return true if xs;
     */
    is_mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },

    /**
     * @description return true if sm;
     */
    is_small_screen() {
      return this.$vuetify.breakpoint.name === "sm";
    },

    /**
     * @description return true if md;
     */
    is_medium_screen() {
      return this.$vuetify.breakpoint.name === "md";
    },

    /**
     * set for components that are still in dev mode
     * @returns true
     */
    is_dev() {
      return process.env.NODE_ENV !== "production";
    },

    /**
     * @returns return true if sm or xs
     */
    small_screen() {
      return this.is_small_screen || this.is_mobile;
    },

    /**
     * the max height for a component to be scrollable
     * @returns number
     */
    max_height() {
      if (this.is_mobile) {
        return undefined;
      }
      return window.innerHeight - 228;
    },
  },
  methods: {
    /**
     * @description scroll to element of the indicated ID
     */
    scrollTo(id) {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    },

    /**
     * @description format the date // default: "DD MMMM YYYY, hh:mm"
     */
    formatDate(date, format) {
      if (format) {
        return this.$moment(date).format(format);
      } else {
        return this.$moment(date).fromNow();
      }
    },

    /**
     * @description format date variable
     */
    formatDateOrNow(variable, format) {
      // moment().diff(moment(jwt_payload.iat, "X"), "days") > 3;
      const is_more_than_1_day =
        this.$moment(variable).diff(this.$moment(), "days") >= 1;
      if (is_more_than_1_day) {
        // Show the date format
        return this.$moment(variable).format(format);
      } else {
        return this.$moment(variable).fromNow();
      }
    },
  },

  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
