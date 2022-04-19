import localforage from "localforage";

const accounts = localforage.createInstance({
  name: 'accounts',
});

export async function createAccount({ alias, ...rest }) {
  return accounts.setItem(alias, rest);
}

export function getAccount(alias) {
  return accounts.getItem(alias)
}

export default accounts;