import { App, Component } from 'vue';
import Icon from './Icon.vue';
type IconResolver = (iconPath: string) => Promise<Component | null>;
interface IconPluginOptions {
    basePath?: string;
    resolver?: IconResolver;
}
/**
 * Vue plugin for icon system
 * @param {Object} options Configuration options
 * @param {string} options.basePath Base path to icon directory
 * @param {Function} options.resolver Function to resolve icon paths to components
 */
declare const IconPlugin: {
    install(app: App, options?: IconPluginOptions): void;
};
export { Icon, IconPlugin };
