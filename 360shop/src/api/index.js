// 封装api的请求函数
// 引入axios
import ajax from "./ajax.js";
import ajaxT from "./ajaxT.js";
import loginAjax from "./loginAjax.js";

//获取分类
export const reqPrimaryCategory = () => ajax.get(`/h5/getPrimaryCategory`);
//根据分类id获取分类详细数据
export const reqSecondaryCategory = (type, id) =>
  ajax.get(`/h5/getSecondaryCategory?type=${type}&id=${id}`);
//获取首页相关数据
export const reqIndexContainer = () => ajax.get(`skin/container?v=`);
export const reqSearchList = obj => ajaxT.post(`api/product/search`, obj);

//登录
export const reqLogin = (username, password) =>
  loginAjax.post("/login", { username, password });
//注册
export const reqRegister = (username, password) =>
  loginAjax.post("/register", { username, password });
//加入购物车
export const reqAddShopCart = (item_id, num = 1) =>
  ajax.post(`/cart/addtocart?item_id=${item_id}&num=${num}`);

//获取商品详情
export const reqShopDetail = (itemId, rewardType = "point") =>
  ajax.get(`/itemDetail/itemInfo?itemId=${itemId}&rewardType=${rewardType}`);

//获取用户详情
export const reqUserInfo = () => loginAjax.get("/getUserInfo");

//切换单个商品是否选中
export const reqCheckedOne = (edit = "select", items) =>
  ajax.get(`/cart/newEditCart?edit=${edit}&items=${escape(items)}`);

//改变全选按钮选中状态
export const reqCheckedAll = (batchEdit = "cancel_all") =>
  ajax.get(`/cart/newBatchEditCart?batchEdit=${batchEdit}`);

//删除单个商品
export const reqDeleteOne = (edit = "delete", items) =>
  ajax.get(`/cart/newEditCart?edit=${edit}&items=${items}`);

export const reqShopCart = () => ajax.get(`/cart/newcart`);
//加减商品数量
export const reqChangeProductNum = (edit = "add", items) =>
  ajax.get(`/cart/newEditCart?edit=${edit}&items=${escape(items)}`);

export const reqAddress = () => ajax.post(`/neworder/order`);

export const reqAcc = obj => ajax.post(`user/doAddAddr`, obj);

export const reqAzz = obj => ajax.post(`/user/doEditAddr`, obj);

//获取验证码
export const reqCode = phone => loginAjax.post(`/ma`, { phone });

//验证码登录
export const reqCodeLogin = (phone, code) =>
  loginAjax.post("/loginCode", { phone, code });
