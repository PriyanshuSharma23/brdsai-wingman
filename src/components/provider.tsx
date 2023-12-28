"use client";

import React, { ReactNode, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/store";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  );

  return (
    <QueryClientProvider client={client}>
      <AuthWrapper>{children}</AuthWrapper>
    </QueryClientProvider>
  );
}

export default Providers;

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("/auth");

  useEffect(() => {
    if (!isLoggedIn() && !isAuthRoute) {
      router.replace("/auth");
    }
  }, [isLoggedIn, router]);

  return children;
};
