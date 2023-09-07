import { isAuthorized } from '@physlane/auth/core';

function Analytics() {
  return <button>Analytics</button>;
}

export default isAuthorized(Analytics, '/signin');
