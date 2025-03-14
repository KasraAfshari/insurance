import type { NavigateOptions } from "react-router-dom";
import React, { useRef } from "react";
import { Provider as RtkProvider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <RtkProvider store={storeRef.current}>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        {children}
      </HeroUIProvider>
    </RtkProvider>
  );
}
