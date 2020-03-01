## 新增奖品接口(图片上传)
* 地址:/api/prize/add
* Method:POST
* 参数:奖品名字prize_name, 总个数stock, 产品图片prize_img, 每天能被抽取个数max_per_day, 中奖概率(1000/1000)probability,是否为大奖(1|0)big_prize(图片名称img_name)

## 修改奖品接口(图片上传)
* 地址:/api/prize/update
* Method:POST
* 参数:奖品id:prize_id(奖品名字prize_name, 产品图片prize_img, 总个数stock, 每天能被抽取个数max_per_day, 中奖概率(1000/1000)probability,是否为大奖(1|0)big_prize,图片名称img_name)

## 获取奖品接口
* 地址:/api/prize/getPrizeList
* Method:GET
* 参数:

## 用户注册
* 地址:/api/user/signup
* Method: POST
* 参数: 手机phone

## 用户登录
* 地址:/api/user/signup
* Method: POST
* 参数: 手机phone
## 新增收货地址(中了实体奖品)
* 地址:/api/user/add_address
* Method: POST
* 参数: 手机phone(cookie解码获得), 地址address


## 获取非安慰奖抽奖记录表(头部滚动)
* 地址:/api/prize/getRecord
* Method: GET
* 参数: 
## 获取全部抽奖记录表(下拉加载, 分页)
* 地址:/api/user/getRecordAll
* Method: GET
* 参数: 
## 抽奖(新增抽奖记录表)
* 地址:/api/user/draw
* Method: GET
* 参数: 手机phone(cookie解码获得)


