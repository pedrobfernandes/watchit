import {
  ContentView,
  ParentPanel,
  PiPProvider,
  QueryDevtoolsContext,
  THEME_PREFERENCE,
  ThemeContext,
  createLocalStorage
} from "./chunk-MUNQJV6W.js";
import {
  createComponent,
  createMemo,
  getPreferredColorScheme
} from "./chunk-TYCJHKIY.js";
import "./chunk-QWN5BXRD.js";

// node_modules/@tanstack/query-devtools/build/DevtoolsPanelComponent/LDUQ2GE4.js
var DevtoolsPanelComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system") return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        disabled: true,
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(ParentPanel, {
                get children() {
                  return createComponent(ContentView, {
                    localStore,
                    setLocalStore,
                    get onClose() {
                      return props.onClose;
                    },
                    showPanelViewOnly: true
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
var DevtoolsPanelComponent_default = DevtoolsPanelComponent;
export {
  DevtoolsPanelComponent_default as default
};
//# sourceMappingURL=LDUQ2GE4-QVDKGHPC.js.map
