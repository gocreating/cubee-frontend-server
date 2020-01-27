import env from './env';

export const parseHost = (host: string) => {
  const parts = host.split('.');
  const firstPart = parts[0] || '';
  const isRootDomain = (
    (env.isStaging && (firstPart === 'stg' || firstPart === 'localhost')) ||
    (env.isProduction && firstPart === 'cubee')
  );
  const isUserSubdomain = !isRootDomain;

  let username = '';
  let rootDomain = host;
  if (isUserSubdomain) {
    username = firstPart;
    parts.shift();
    rootDomain = parts.join('.');
  }
  return {
    isRootDomain,
    isUserSubdomain,
    rootDomain,
    username,
  }
}
