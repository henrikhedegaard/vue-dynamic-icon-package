import { createElementBlock as c, openBlock as i, normalizeStyle as l, createBlock as d, resolveDynamicComponent as u, mergeProps as h } from "vue";
const p = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, s] of t)
    o[r] = s;
  return o;
}, f = {
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
        e += e ? ` !size-${t}` : `!size-${t}`;
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
        const o = await t(this.iconPath);
        if (o && o.render) {
          const r = o.render;
          o.render = function(s) {
            const n = r.call(this, s);
            return n && n.tag === "svg" && (n.data || (n.data = {}), n.data.class || (n.data.class = ""), n.data.class += " w-full h-full"), n;
          };
        }
        this.dynamicComponent = o;
      } catch (t) {
        console.warn(`Failed to load icon: ${this.iconPath}`, t), this.error = t.message, this.dynamicComponent = null;
      }
    }
  }
}, m = {
  key: 1,
  class: "icon-placeholder w-full h-full"
};
function y(e, t, o, r, s, n) {
  return i(), c("div", {
    class: "icon-wrapper",
    style: l({ width: n.computedSize, height: n.computedSize })
  }, [
    s.dynamicComponent ? (i(), d(u(s.dynamicComponent), h({ key: 0 }, e.$attrs, {
      class: ["icon-svg [&>*]:w-full [&>*]:h-full", [n.customClass, "w-full h-full"]]
    }), null, 16, ["class"])) : (i(), c("div", m))
  ], 4);
}
const g = /* @__PURE__ */ p(f, [["render", y], ["__scopeId", "data-v-5f811884"]]), z = (e) => async (t) => {
  try {
    return await e.resolver(t);
  } catch (o) {
    return console.warn(`Failed to resolve icon: ${t}`, o), null;
  }
}, v = {
  install(e, t = {}) {
    const r = { ...{
      basePath: "",
      resolver: async (n) => {
        try {
          return await import(`${n}.vue`);
        } catch (a) {
          return console.error(`Icon not found: ${n}.vue`, a), null;
        }
      }
    }, ...t }, s = z(r);
    e.provide("iconOptions", {
      basePath: r.basePath,
      loader: s
    }), e.config.globalProperties.$iconOptions = {
      basePath: r.basePath,
      loader: s
    }, e.component("Icon", g);
  }
};
export {
  g as Icon,
  v as IconPlugin
};
