export default _sfc_main;
declare namespace _sfc_main {
    const name: string;
    namespace props {
        export namespace name_1 {
            const type: StringConstructor;
            const required: boolean;
            const description: string;
        }
        export { name_1 as name };
        export namespace folder {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default: string;
            export { _default as default };
            const description_1: string;
            export { description_1 as description };
        }
        export namespace size {
            const type_2: (StringConstructor | NumberConstructor)[];
            export { type_2 as type };
            const _default_1: number;
            export { _default_1 as default };
            const description_2: string;
            export { description_2 as description };
        }
        export namespace _class {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_2: string;
            export { _default_2 as default };
            const description_3: string;
            export { description_3 as description };
        }
        export { _class as class };
    }
    function data(): {
        dynamicComponent: null;
        error: null;
    };
    namespace computed {
        function computedSize(): any;
        function customClass(): any;
        function iconPath(): any;
    }
    function mounted(): Promise<void>;
    namespace watch {
        function name(): void;
        function folder(): void;
    }
    namespace methods {
        function loadIcon(): Promise<void>;
    }
}
