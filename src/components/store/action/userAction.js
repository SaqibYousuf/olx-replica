export function SignIn(payload) {
  return {
    type: "signIn",
    payload,
  };
}
export function Post(payload) {
  return {
    type: "post",
    payload,
  };
}
export function get(payload) {
  return {
    type: "get",
    payload,
  };
}
export function single(payload) {
  return {
    type: "single",
    payload,
  };
}
export function send(payload) {
  return {
    type: "send",
    payload,
  };
}
export function msgGet(payload) {
  return {
    type: "getMsg",
    payload,
  };
}
export function chatMember(payload) {
  return {
    type: "getMem",
    payload,
  };
}
export function userGet(payload) {
  return {
    type: "userGet",
    payload,
  };
}
export function userupd(payload) {
  return {
    type: "userupd",
    payload,
  };
}

