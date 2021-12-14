import API from '@/api/api';
import storage from '@/api/storage';
const CUSTTYPE = 'account/account/queryCustType';
const SAVEKEY = 'S_CUSTTYPES'; // 保存的key
const SAVETIME = 300; // 缓存中有效时间/秒
/**
 * 用户角色管理
 */
export default {
  /**
   * 优先读取缓存，若缓存无值，请求接口
   * @param {Boolean} force 是否强制请求接口
   */
  queryCustType (force = false) {
;
    if (force) return this._queryCustType();
    else {
      return new Promise((resolve) => {
        storage.get(SAVEKEY, (r, expired) => {
          if (r) {

            if (expired) {
              r.dataexpired = true;
              this._queryCustType();
            }
            resolve(r);
          } else {

            this._queryCustType()
            .then((r) => {
              resolve(r);
            });
          }
        })
      });
    }
  },
  /**
   * 接口查询用户角色
   */
  _queryCustType () {
    return new Promise((resolve) => {
      API.get(CUSTTYPE, "", (r) => {
        if (r.successful == true) {
          this.saveCustType(r);
        } else {
          if (r.code == 'ETS-5BP00001') {
            this.removeCustType(true);
          }
        }
        resolve(r);
      });
    });
  },
  /**
   * 保存用户角色 
   */
  saveCustType (r) {
    return new Promise((resolve) => {
      storage.put(SAVEKEY, {
        custtypes: r.custtypes
      }, SAVETIME, function () {
        resolve()
      });
    })
  },
  /**
   * 删除用户角色 
   */
  removeCustType (logout = false) {
    if (logout) return this.saveCustType({custtypes: null});
    return new Promise((resolve) => {
      storage.remove(SAVEKEY, function () {
        resolve()
      });
    })
  }
}
