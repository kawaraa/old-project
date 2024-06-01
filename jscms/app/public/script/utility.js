"use strict";

class Http {
  static fetch(url, method = "GET", responseType = "json") {
    // "json", "text", "document", blob, "arraybuffer"
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType.toLocaleLowerCase();
      xhr.open(method, url, true);
      xhr.onload = () => {
        const result = xhr.responseType !== "text" ? xhr.response : xhr.responseText;
        if (xhr.status >= 200 && xhr.status < 300 && result) return resolve(result);
        const error = result && result.message ? result.message : result;
        return reject(new Error(error || "Something went wrong please try again(!)"));
      };
      xhr.onerror = (error) => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send();
    });
  }
  static send(data, url, method = "POST", type = "application/json", responseType = "json") {
    // "application/json", "x-www-form-urlencoded", "text/plain", text/html
    // Not: if "Content-Type" is "application/json", then the data you send must be json.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType;
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", type);
      xhr.onload = () => {
        const result = xhr.responseType !== "text" ? xhr.response : xhr.responseText;
        if (xhr.status >= 200 && xhr.status < 300 && result) return resolve(result);
        const error = result && result.message ? result.message : result;
        return reject(new Error(error || "Something went wrong please try again(!)"));
      };
      xhr.onerror = (error) => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }
  static convertToURLEncoded(obj) {
    const query = [];
    for (let key in obj) {
      query.push(`${key}=${obj[key]}`);
    }
    return `?${query.join("&")}`;
  }

  static parseUREncoded(url) {
    if (url.length < 3) return "";
    let obj = {};
    let query = url.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      obj[pair[0]] = pair[1];
    }
    return obj;
  }
  static toJSON(data) {
    try {
      const json = JSON.stringify(data);
      return json;
    } catch (e) {}
    return data;
  }
  static parseJSON(data) {
    try {
      const json = JSON.parse(data);
      return json;
    } catch (e) {}
    return data;
  }
}

function getId() {
  return document.getElementById(...arguments);
}
function query() {
  return document.querySelector(...arguments);
}
function queryAll() {
  return document.querySelectorAll(...arguments);
}
function createElement() {
  return document.createElement(...arguments);
}
function removeClass(el, className) {
  el.className = el.className.replace(" " + className, "");
  return el;
}
function addClass(el, className) {
  el.className += " " + className;
  return el;
}
