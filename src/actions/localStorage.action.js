export const loadUserInfo = type => {
  try {
    let temp = localStorage.getItem(type);
    return temp;
  } catch (e) {
    console.log("loadAuthToken error");
    throw e;
  }
};

export const saveUserInfo = user_info => {
  console.log(user_info);
  try {
    const {
      instance_token,
      user_token,
      username,
      cell,
      email,
      icon_path,
      logo_path,
      lord_key,
      lord_token,
      realm_token
    } = user_info;
    localStorage.setItem("instance_token", instance_token);
    localStorage.setItem("user_token", user_token);
    localStorage.setItem("username", username);
    localStorage.setItem("cell", cell);
    localStorage.setItem("email", email);
    localStorage.setItem("icon_path", icon_path);
    localStorage.setItem("logo_path", logo_path);
    localStorage.setItem("lord_key", lord_key);
    localStorage.setItem("lord_token", lord_token);
    localStorage.setItem("realm_token", realm_token);
  } catch (e) {
    console.log("save auth token error");
    throw e;
  }
};

export const clearUserInfo = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.log("remove user error");
    throw e;
  }
};
