const encodeProviderEmail = (email: string): string => {
  return email.replaceAll(/@/gi, '_');
};

// required to generate unique tuple [provider, providerAccountId] for auth.js
export const resolveInternalProviderName = (userEmail: string): string => {
  return `credentials-${encodeProviderEmail(userEmail)}`;
};
