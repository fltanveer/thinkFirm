import type { ReactNode } from 'react';
import { AuthBeaconGraphic } from './AuthBeaconGraphic';
import loginBg from '../../../assets/login-bg.webp';

// Shared shell for every /auth/* screen. The form pane scrolls independently
// on shorter screens while the decorative pane remains fixed on desktop.
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <main className="flex min-h-dvh items-start justify-center overflow-y-auto bg-card px-xl py-3xl [&_button]:min-h-[44px] lg:h-dvh">
        <div className="my-auto w-full max-w-[26rem]">{children}</div>
      </main>

      <div
        className="hidden h-dvh overflow-hidden bg-primary-0 bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <AuthBeaconGraphic />
      </div>
    </div>
  );
}
