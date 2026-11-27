/**
 * Shared Clerk appearance so every prebuilt auth surface (SignIn, SignUp,
 * UserButton, modals) matches the Metro Dental theme: teal primary, sharp
 * corners, DM Sans body copy and muted slate helper text.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#0a7ea4",
    colorBackground: "#ffffff",
    colorText: "#1a2634",
    colorTextSecondary: "#5a6a7a",
    colorTextOnPrimaryBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#1a2634",
    colorBorder: "#d9e8ee",
    colorDanger: "#b42318",
    colorSuccess: "#0a7ea4",
    colorWarning: "#b45309",
    colorNeutral: "#1a2634",
    borderRadius: "0px",
    fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
    fontFamilyButtons: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
    fontSize: "0.95rem",
  },
  elements: {
    rootBox: "w-full",
    card: "border border-border bg-background shadow-sm",
    headerTitle: "font-serif text-3xl font-light tracking-[-0.02em] text-foreground",
    headerSubtitle: "text-sm text-muted-foreground",
    socialButtonsBlockButton:
      "h-12 border border-border bg-background text-foreground hover:border-accent hover:text-accent",
    socialButtonsBlockButtonText: "text-xs uppercase tracking-[0.1em] font-medium",
    dividerLine: "bg-border",
    dividerText: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
    formFieldLabel: "text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium",
    formFieldInput:
      "h-12 border border-input bg-background text-sm text-foreground focus:border-ring focus:ring-2 focus:ring-ring/30",
    formButtonPrimary:
      "h-12 bg-primary text-xs uppercase tracking-[0.15em] text-primary-foreground shadow-none transition-colors duration-300 hover:bg-[#085f7a]",
    footerActionText: "text-sm text-muted-foreground",
    footerActionLink: "text-primary font-medium hover:text-[#085f7a]",
    formFieldAction: "text-primary text-xs uppercase tracking-[0.1em]",
    alert: "border border-border bg-secondary text-foreground",
    alertText: "text-sm text-foreground",
    otpCodeFieldInput: "h-12 border border-input",
    formResendCodeLink: "text-primary text-xs uppercase tracking-[0.1em]",
    badge: "bg-secondary text-foreground",
  },
}
