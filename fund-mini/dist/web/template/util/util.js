/*
 * @Author: your name
 * @Date: 2021-08-10 09:44:35
 * @LastEditTime: 2021-08-12 14:24:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lighting-toole:\project\lighting-plugins\lighting-plugin-miniprogram\template\util\util.js
 */

function translateToNoSlashString(data) {
  if (typeof data === "string") return data.replace(/\\/g, "lightBackslash");
  return data
}
function translateToDefault(data) {
  if (typeof data === "string") return data.replace(/lightBackslash/g, "\\");
  return data
}
