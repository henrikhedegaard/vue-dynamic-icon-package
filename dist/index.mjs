import { openBlock as r, createElementBlock as c, normalizeStyle as l, createBlock as d, resolveDynamicComponent as u, mergeProps as h } from "vue";
const p = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, n] of t)
    o[s] = n;
  return o;
}, m = {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: !0,
      description: "The filename of the SVG icon (without extension)"
    },
    folder: {
      type: String,
      default: "",
      description: "Optional subfolder within the icons directory"
    },
    size: {
      type: [String, Number],
      default: 24,
      description: "Size of the icon (number for pixels, string for custom units)"
    },
    class: {
      type: String,
      default: "",
      description: "Additional CSS classes (e.g. Tailwind classes)"
    }
  },
  data() {
    return {
      dynamicComponent: null,
      error: null
    };
  },
  computed: {
    computedSize() {
      return typeof this.size == "number" ? `${this.size}px` : this.size;
    },
    customClass() {
      let e = this.class ? this.class : "";
      if (typeof this.size == "number" || typeof this.size == "string" && !isNaN(parseInt(this.size))) {
        const t = typeof this.size == "number" ? this.size : parseInt(this.size);
        e += e ? ` size-${t}` : `size-${t}`;
      }
      return e;
    },
    iconPath() {
      var o;
      const e = ((o = this.$iconOptions) == null ? void 0 : o.basePath) || "", t = this.folder ? `${this.folder}/` : "";
      return `${e}${t}${this.name}`;
    }
  },
  async mounted() {
    await this.loadIcon();
  },
  watch: {
    name() {
      this.loadIcon();
    },
    folder() {
      this.loadIcon();
    }
  },
  methods: {
    async loadIcon() {
      var e;
      try {
        this.error = null;
        const t = (e = this.$iconOptions) == null ? void 0 : e.loader;
        if (!t) {
          console.error(
            "Icon loader not configured. Did you install the plugin correctly?"
          ), this.error = "Icon loader not configured", this.dynamicComponent = null;
          return;
        }
        this.dynamicComponent = await t(this.iconPath);
      } catch (t) {
        console.warn(`Failed to load icon: ${this.iconPath}`, t), this.error = t.message, this.dynamicComponent = null;
      }
    }
  }
}, f = {
  key: 1,
  class: "icon-placeholder w-full h-full"
};
function y(e, t, o, s, n, i) {
  return r(), c("div", {
    class: "icon-wrapper",
    style: l({ width: i.computedSize, height: i.computedSize })
  }, [
    n.dynamicComponent ? (r(), d(u(n.dynamicComponent), h({ key: 0 }, e.$attrs, {
      class: ["icon-svg", i.customClass],
      style: { width: "100%", height: "100%" }
    }), null, 16, ["class"])) : (r(), c("div", f))
  ], 4);
}
const _ = /* @__PURE__ */ p(m, [["render", y], ["__scopeId", "data-v-b456ed43"]]), g = (e) => async (t) => {
  try {
    return await e.resolver(t);
  } catch (o) {
    return console.warn(`Failed to resolve icon: ${t}`, o), null;
  }
}, b = {
  install(e, t = {}) {
    const s = { ...{
      basePath: "",
      resolver: async (i) => {
        try {
          return await import(`${i}.vue`);
        } catch (a) {
          return console.error(`Icon not found: ${i}.vue`, a), null;
        }
      }
    }, ...t }, n = g(s);
    e.provide("iconOptions", {
      basePath: s.basePath,
      loader: n
    }), e.config.globalProperties.$iconOptions = {
      basePath: s.basePath,
      loader: n
    }, e.component("Icon", _);
  }
};
export {
  _ as Icon,
  b as IconPlugin
};
