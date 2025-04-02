import { openBlock as i, createBlock as a, resolveDynamicComponent as l, mergeProps as d, createElementBlock as u, normalizeStyle as h } from "vue";
const m = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, n] of t)
    o[r] = n;
  return o;
}, p = {
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
      return this.class ? this.class : "";
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
          console.error("Icon loader not configured. Did you install the plugin correctly?"), this.error = "Icon loader not configured", this.dynamicComponent = null;
          return;
        }
        this.dynamicComponent = await t(this.iconPath);
      } catch (t) {
        console.warn(`Failed to load icon: ${this.iconPath}`, t), this.error = t.message, this.dynamicComponent = null;
      }
    }
  }
};
function f(e, t, o, r, n, s) {
  return n.dynamicComponent ? (i(), a(l(n.dynamicComponent), d({ key: 0 }, e.$attrs, {
    width: o.size,
    height: o.size,
    class: s.customClass
  }), null, 16, ["width", "height", "class"])) : (i(), u("div", {
    key: 1,
    class: "icon-placeholder",
    style: h({ width: s.computedSize, height: s.computedSize })
  }, null, 4));
}
const y = /* @__PURE__ */ m(p, [["render", f], ["__scopeId", "data-v-f04dd415"]]), g = (e) => async (t) => {
  try {
    return await e.resolver(t);
  } catch (o) {
    return console.warn(`Failed to resolve icon: ${t}`, o), null;
  }
}, I = {
  install(e, t = {}) {
    const r = { ...{
      basePath: "",
      resolver: async (s) => {
        try {
          return await import(`${s}.vue`);
        } catch (c) {
          return console.error(`Icon not found: ${s}.vue`, c), null;
        }
      }
    }, ...t }, n = g(r);
    e.provide("iconOptions", {
      basePath: r.basePath,
      loader: n
    }), e.config.globalProperties.$iconOptions = {
      basePath: r.basePath,
      loader: n
    }, e.component("Icon", y);
  }
};
export {
  y as Icon,
  I as IconPlugin
};
