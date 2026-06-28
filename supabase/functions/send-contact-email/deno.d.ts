// Type declarations to satisfy TypeScript for the Deno std http server import
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(
    handler: (req: Request) => Response | Promise<Response>,
  ): void | Promise<void>;
}

// Global Deno namespace
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

