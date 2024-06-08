const ENDPOINT_FRONTEND = {
    CREATE_NEW_ACCOUNT: 'accounts/create',
    ACCOUNT: '/api/accounts/',
    GET_ACCOUNTS: 'accounts/query',
    GET_ACCOUNTS_PAGINATION: '/api/accounts',
    UPDATE_SESSION: 'accounts/session/$ID$',
  } as const
  
  export default ENDPOINT_FRONTEND
  