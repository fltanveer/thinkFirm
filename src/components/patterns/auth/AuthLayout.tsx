import type { ReactNode } from 'react';
import loginBg from '../../../assets/login-bg.webp';
import authVideo from '../../../assets/business_outcomes_motion_animation_h264.mp4';

// Shared shell for every /auth/* screen. The form pane scrolls independently
// on shorter screens while the decorative pane remains fixed on desktop.
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-sg2-bg-page lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <main className="flex min-h-dvh items-start justify-center overflow-y-auto bg-sg2-bg-card px-sg2-xl py-sg2-2xl [&_a]:text-sg2-body-sm [&_button]:min-h-[44px] [&_button]:text-sg2-body-sm [&_input]:text-sg2-body-sm [&_label]:text-sg2-body-sm [&_li]:text-sg2-body-sm [&_p]:text-sg2-body-sm [&_span]:text-sg2-body-sm [&_textarea]:text-sg2-body-sm lg:h-dvh">
        <div className="my-auto w-full max-w-[28rem]">{children}</div>
      </main>

      <div className="relative hidden h-dvh overflow-hidden bg-sg2-primary-30 lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={loginBg}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={authVideo} type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sg2-bg-card/35 via-sg2-primary-30/10 to-sg2-primary-30/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sg2-primary-30/20 via-transparent to-sg2-bg-card/10"
        />
      </div>
    </div>
  );
}
