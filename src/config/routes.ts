import type { Route } from "next";

/**
 * Object containing route definitions for the application.
 * Includes both public (base) and secure routes.
 */

const routes = {
  base: {
    home: "/home" as Route<string>,
    about: "/about" as Route<string>,
    contact: "/contact" as Route<string>,
    signIn: "/sign-in" as Route<string>,
    notFound: "/not-found" as Route<string>,
    passwordResetEmail: "/password-reset-email" as Route<string>,
    passwordComfirm: "/password-reset-email-confirm" as Route<string>,
    passwordReset: "/password-reset" as Route<string>,
  },
  secure: {
    admin: "/secure/admin" as Route<string>,
    clientA: "/secure/client-a" as Route<string>,
    clientB: "/secure/client-b" as Route<string>,
    clientC: "/secure/client-c" as Route<string>,
  },
};

export default routes;
