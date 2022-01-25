const homeMenu = [
  //"肥肠面",
  "螺蛳粉",
  "回锅肉",
  "胡辣汤",
  "面皮儿",
  //"方便面",
  "豆角焖面",
  "火锅",
  "大盘鸡",
  "黄焖鸡",
  //"卤肉面",
  "干锅花菜",
  "水饺",
  "火锅面",
  "水果沙拉",
  //"鸡蛋面",
  "醋溜白菜",
  "红烧肉",
  //"白吉馍",
  "鸭血粉丝汤",
  "手抓饼",
  "煎包",
  //"油条",
  "麻婆豆腐",
  "酸汤肥牛",
  "烤红薯",
  "烤鱼",
  "烤鸡+蔬菜",
  //"巧克力",
  "红烧排骨",
  "孜然羊肉",
  "地三鲜",
  "糖醋排骨",
  "Pizza",
  "可乐鸡翅",
  "油焖大虾",
  "京酱肉丝",
  "孜然羊肉",
  "蛋炒饭",
];

const restaurantMenu = [
  "Brunch",
  "泰国菜",
  "越南菜",
  "韩国菜",
  "印度菜",
  "烧烤",
  "火锅",
  "大盘鸡",
  "麻辣干锅",
  "新疆菜",
  "湖南菜",
  "早茶",
  "北京烤鸭",
  "意大利菜",
  "奶茶",
  "日本菜",
  "小笼包",
];

export interface CombinedMenus {
  [key: string]: string[];
}

export const combinedMenus: CombinedMenus = {
  home: homeMenu,
  restaurant: restaurantMenu,
};

// export const combinedMenus = [
//   homeMenu,
//   restaurantMenu
// ]
