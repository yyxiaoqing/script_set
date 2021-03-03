/*
更新时间:2021-02-02 19:50
更新时间:2021-02-14 19:10
百度极速版签到任务，使用脚本有黑号严重，请谨慎使用‼️
赞赏:百度极速邀请码`RW9ZSW 点击链接立得红包，最高100元！https://dwz.cn/Oilv4CJ1`,农妇山泉 -> 有点咸，万分感谢
本脚本默认使用chavyleung大佬和Nobyda的贴吧ck，获取方法请看大佬仓库说明，内置自动提现，提现金额默认30元，当当前时间为早上6点且达到提现金额时仅运行提现任务，提现金额小于设置金额时继续运行其他任务。
增加百度任务开关，Actions中Secrets为BAIDU_TASK，值填true或者false
支持BoxJs多账号，需手动填写，用&或者换行隔开
~~~~~~~~~~~~~~~~
*/
const $ = new Env('百度极速版')
let CookieArr = [],cashArr=[];
let UA = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 SP-engine/2.24.0 info baiduboxapp/5.1.1.10 (Baidu; P2 14.2)`;
const notify = $.isNode() ? require('./sendNotify') : '';
const baiducks = $.getdata(`cookie_baidu`);
const baiducks = $.getdata(`chavy_cookie_tieba`) || $.getdata(`CookieTB`);
let baiducash = $.getdata(`cash_baidu`);

let taskON = $.getdata(`task_baidu`)||"true"//除提现和兑换外其他任务开关;
let isblack = "false";
let UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 SP-engine/2.24.0 matrixstyle/0 info baiduboxapp/5.1.6.10 (Baidu; P2 14.2)'


if(!$.isNode()&&baiducks && baiducks.indexOf('&')==-1){
  CookieArr.push(baiducks);
    cashArr.push($.getdata("cash_baidu")||30)
} else {
if ($.isNode()) {
  if (process.env.BAIDU_COOKIE && process.env.BAIDU_COOKIE.indexOf('&') > -1) {
  BDCookie = process.env.BAIDU_COOKIE.split('&');
@@ -35,8 +43,12 @@ if ($.isNode()) {
 else if (process.env.BAIDU_CASH && process.env.BAIDU_CASH.indexOf('\n') > -1) {
  BDCASH = process.env.BAIDU_CASH.split('\n');
  } else {
  BDCASH = process.env.BAIDU_CASH.split()
  BDCASH = [process.env.BAIDU_CASH]
  }
} else if (!$.isNode()&&baiducks && baiducks.indexOf('&')>-1){
  BDCookie = baiducks.split("&")
  BDCASH = [baiducash]
}

  Object.keys(BDCookie).forEach((item) => {
        if (BDCookie[item]) {
@@ -48,41 +60,24 @@ if ($.isNode()) {
          cashArr.push(BDCASH[item])
        } 
    })
} else if(baiducks && baiducks.indexOf('&')>-1){
     BDCookie = baiducks.split("&")
     Object.keys(BDCookie).forEach((item) => {
     if (BDCookie[item]) {
          CookieArr.push(BDCookie[item])
        } 
    })
} else {
    CookieArr.push($.getdata(`chavy_cookie_tieba`) || $.getdata(`CookieTB`));
    cashArr.push($.getdata("cash_baidu")||30)
}
    console.log(`您共提供${CookieArr.length}个百度账号 Cookie`)
 }

if ($.isNode()) {
      //console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
     console.log(`您共提供${CookieArr.length}个百度账号 Cookie`)
}
!(async() =>{
  if (!CookieArr[0]) {
    console.log($.name, '【提示】请把百度Cookie填入Github 的 Secrets 中，请以&或者换行隔开');
    return
  };
    timeZone = new Date().getTimezoneOffset() / 60;
    timestamp = Date.now()+ (8+timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp).toLocaleString('zh',{hour12:false,timeZoneName: 'long'});
    console.log(`\n === 脚本执行 ${bjTime} ===\n`);
  for (let i = 0; i < CookieArr.length; i++) {
    if (CookieArr[i]) {
      cookieval = CookieArr[i];
      withcash = cashArr[i];
      $.index = i + 1;
      let username = null,
          chargemoney = 0,
          availablecoin = 0;
      await userInfo();
     if (isblack == true) {
        $.msg($.name + " 账号" + username + "已黑号", "您的金币和余额已被冻结，请联系客服处理");
        continue;
      }
      await $.wait(1000);
      if ($.isNode()) {
        if (process.env.BAIDU_TASK) {
@@ -92,28 +87,29 @@ if ($.isNode()) {
      if (taskON == "true") {
        $.desc = "";
        await firstbox();
        await TaskCenter()
        await TaskCenter();
      }
      //await showmsg()
      //await drawPrize();
    }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


function confApi(api, body, RefererUrl) {
    return {
       url: 'https://haokan.baidu.com/activity/'+api,
       headers:{
           'Cookie': cookieval,
           'User-Agent': UA,
           'Referer': RefererUrl
       },
       body:body
    }
}
//签到
function getsign() {
    return new Promise((resolve, reject) =>{
        let signurl = {
            url: `https://haokan.baidu.com/activity/acusercheckin/update`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA
            },
            body: 'productid=2&ugus=9766888061'
        }
        $.post(signurl, async(error, response, data) =>{
        $.post(confApi('acusercheckin/update','productid=2&ugus=9766888061'), async(error, resp, data) =>{
            let get_sign = JSON.parse(data);
            if (get_sign.errno == 0) {
                $.desc = get_sign.data.tips+` 收益: ${get_sign.data.bonus.coin}💰\n`;
@@ -130,77 +126,23 @@ function getsign() {
    })
}

function userInfo() {
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      let infourl = {
        url: `https://haokan.baidu.com/activity/h5/income?productid=2&from=1005640h&network=1_0&osname=baiduboxapp`,
        headers: {
          Cookie: cookieval,
          'User-Agent': UA
        }
      };
      $.get(infourl, async(error, resp, data) =>{
  try {
      if (resp.statusCode == 200) {
                  username = "null";
                 if(data.match(/user_name\":\"([\w+\\]+)/)){
                    username = unescape(data.match(/user_name\":\"([\w+\\]+)/)[1].replace(/\\/g, "%"))
                 }
                    chargemoney = data.match(/charge_money":"(\d+\.\d+)/)[1],
                    enabledmoney = data.match(/enabled_money":(\d+)/)[1],
                    waitingcoin = data.match(/waiting_coin":(\d+)/)[1],
                    availablecoin = data.match(/available_coin":(\d+)/)[1],
                    invitecode = data.match(/invite_code":"(\w+)/)[1],
                    coinenabled = data.match(/coin_enabled":(\d+)/)[1]
                    if (coinenabled > 100) {
                    coinnum = parseInt(coinenabled / 100) * 100;
                    await coinexChange()
                  }
                    //rate = data.match(/exchange_rate":(\d+)/)[1]
                    isblack = data.match(/is_black":(\w+)/)[1]
               }
                  $.sub = " 昵称:" + username + " 现金:" + chargemoney + "元 金币:" + availablecoin;
                  $.log("\n********** 昵称:" + username + " 现金:" + chargemoney + "元 **********\n");
                  if (enabledmoney>500&&parseInt(enabledmoney/100) >= Number(withcash) && $.time("HH") == "06") {
                    await withDraw(withcash);
                    if ($.isNode()) {
                      await notify.sendNotify($.name + " 成功提现" + withcash + "元\n" + $.sub)
                    }
                    $.done()
              }
        } catch(error) {
          $.msg($.name, "获取用户信息失败","请更换Cookie")
          $.log("用户信息详情页错误\n" + error + "\n" + formatJson(data.match(/window\.PAGE_DATA = (.+)/)).replace(new RegExp("\\\\\"", "gm"), "\""))
        }
        resolve()
      })
    },
    1000)
  })
}

function withDraw(cash) {
    return new Promise((resolve, reject) =>{
        let cashurl = {
            url: `https://haokan.baidu.com/activity/acuserwithdraw/confirm?productid=2&amount=${cash*100}&trade_type=1`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA
            }
  return new Promise((resolve, reject) =>{
    $.get(confApi(`acuserwithdraw/confirm?productid=2&amount=${cash*100}&trade_type=1`), async(error, resp, data) =>{
      let get_cash = JSON.parse(data);
      if (get_cash.errno == 0) {
        $.sub = ' 提现成功: 到账 ' + get_cash.data.money + "元 ";
        $.msg($.name, $.sub);
        if ($.isNode()) {
          await notify.sendNotify($.name + " 成功提现" + withcash + "元\n" + $.sub)
        }
        $.get(cashurl, (error, response, data) =>{
            let get_cash = JSON.parse(data);
            if (get_cash.errno == 0) {
                $.sub = ' 提现成功: 到账 ' + get_cash.data.money + "元 ",
                $.msg($.name, $.sub)
            } else {
                $.log(data + "\n " + get_cash.msg),
                $.msg($.name, get_cash.msg)
            }
            resolve()
        })
      } else {
        $.log(data + "\n " + get_cash.msg);
        $.msg($.name, get_cash.msg)
      }
      resolve()
    })
  })
}


@@ -221,16 +163,45 @@ function invite() {
    })
}

function userInfo() {
  return new Promise((resolve, reject) =>{
    $.post(confApi('api/tenure/osname=baiduboxapp','sign=a329b14e561e5f42d466d568623cd972&time=1612958577&productid=2'), async(error, resp, data) =>{
      try {
        let get_pay = JSON.parse(data);
        //$.log("获取收益信息:"+data +'\n')
        if (get_pay.errno == 0) {
          availablecoin = get_pay.data.available_coin,
          enabledcoin = get_pay.data.enabled_coin,
          enabledmoney = get_pay.data.enabled_money,
          yesterdaycoin = get_pay.data.yesterday_coin;
       if(CookieArr.length==1){
          username = $.getdata('baidu_nick') ? $.getdata('baidu_nick') : null;
         } else {
          username = "账号"+ $.index
         }
          $.sub = " 昵称:" + username + " 现金:" + enabledmoney + "元 金币:" + availablecoin;
          $.log("\n********** 昵称:" + username + " 现金:" + enabledmoney + "元 **********\n");
          if (parseInt(enabledmoney) >= Number(withcash) && $.time("HH") == "06") {
            await withDraw(withcash);
            $.done()
          };
          if (enabledcoin > 100) {
            coinnum = parseInt(enabledcoin / 100) * 100;
            await coinexChange()
          }
        }
      } catch(e) {
        $.log("获取用户信息失败" + e)
      } finally {
        resolve()
      }
    })
  })
}

function coinexChange() {
    return new Promise((resolve, reject) =>{
        let Changeurl = {
            url: `https://haokan.baidu.com/activity/api/coinexchange?coinnum=${coinnum}&autolock=1&productid=2&ugVersion=5.1.1.10`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA
            }
        }
        $.get(Changeurl, (error, resp, data) =>{
        $.get(confApi(`api/coinexchange?coinnum=${coinnum}&autolock=1&productid=2&ugVersion=5.1.6.10`), (error, resp, data) =>{
             let exchange = JSON.parse(data)
               //$.log(data)
             if (exchange.errno == 0) {
@@ -244,20 +215,25 @@ function coinexChange() {

function TaskCenter() {
  return new Promise((resolve, reject) =>{
    let rewurl = {
      url: `https://haokan.baidu.com/activity/h5/vaultnew?productid=2&fromcsr=1&system=ios&_format=json`,
      headers: {
        Cookie: cookieval,
        'User-Agent': UA
      }
    }
    $.get(rewurl, async(error, resp, data) =>{
       //console.log(formatJson(data))
      try {
    $.get(confApi('h5/vaultnew?productid=2&fromcsr=1&system=ios&_format=json'), async(error, resp, data) =>{
     try {
        let get_tasks = JSON.parse(data);
      if(get_tasks.errno==7){
      $.msg($.name, get_tasks.msg, "请更换Cookie后，重试");
      return
     } else if(get_tasks.data.uname!=""&&CookieArr.length==1){
        username = get_tasks.data.uname;
        $.setdata(username,'baidu_nick')
        }
       isblack = get_tasks.data.is_black

        $.log("      🛎 ========== 任务开始 ========== 🛎     "); 
        tasks = get_tasks.data.comps;
        for (x in tasks) {
        if (isblack == true) {
        $.msg($.name + " 账号" + username + "已黑号", "您的金币和余额已被冻结，请联系客服处理");
        break;
       }
          taskid = tasks[x].taskId;
          id = tasks[x].id;
          if (tasks[x].name == "signIn") {
@@ -280,6 +256,7 @@ function TaskCenter() {
        $.logErr(e, data);
      } finally {
        $.msg($.name, $.sub, $.desc)
        resolve()
      }
    })
  })
@@ -408,7 +385,6 @@ function activeBox() {
      } else if (data.indexOf("EquipmentComplete") >-1) {
        $.log(act_box.data.data+"\n")
      } else {
        //$.log(formatJson(data))
        await get_pkg()
      }
      } catch(e) {
@@ -573,86 +549,12 @@ function searchBox(id) {
        })
    })
}
//缩减开宝箱时间
function chestTime() {
    return new Promise((resolve, reject) =>{
        let timeurl = {
            url: `https://eopa.baidu.com/api/task/1/task/${taskid}/complete?rewardType=chestTime&rewardVideoPkg=${Pkg}`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA,
                Referer: RefererUrl
            }
        }
        $.get(timeurl, (error, resp, data) =>{
            //$.log(data) 
          try {
                let get_chest = JSON.parse(data); 
                if (get_chest.errno == 11006) {
                    $.log("开宝箱任务" + get_chest.errmsg)
                } else if (get_chest.errno == 0) {
                    $.log("开宝箱时间缩减" + get_chest.data.awardTime / 60 + "分钟")
                } else if (get_chest.errno == 19001 && get_chest.data.originData.errno == 10074) {
                    //$.desc += get_chest.data.originData.msg
                    $.log("开宝箱任务ID:" + taskid + get_chest.data.originData.msg)
                }
            } catch(e) {
                $.logErr(e + data);
            } finally {
                resolve()
            }
        })
    })
}

//头部宝箱
function headerBox() {
    return new Promise((resolve, reject) =>{
        let headerboxurl = {
            url: `https://haokan.baidu.com/activity/acuserchest/openheader?productid=2&fromcsr=1`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA
            }
        }
        $.get(headerboxurl, async(error, response, data) =>{
            let hed_box = JSON.parse(data)
            //$.log('headerbox: ' + data)
            if (hed_box.errno == 0) {
                $.desc += '【头部宝箱】: 总计金币' + hed_box.data.gameheader.coinInfo.coinCount
            } else {
                $.log('【头部宝箱】❎'+hed_box.msg)
            }
            resolve()
        })
    })
}
function doubleBox() {
    return new Promise((resolve, reject) =>{
        let douboxurl = {
            url: `https://eopa.baidu.com/api/task/1/task/${taskid}/complete?rewardType=chestDouble&rewardVideoPkg=${Pkg}`,
            headers: {
                Cookie: cookieval,
                'User-Agent': UA,
                Referer: RefererUrl
            }
        }
        $.get(douboxurl, (error, response, data) =>{
            let get_doubox = JSON.parse(data);
            if (get_doubox.errno == 0) {
                $.desc += '开宝箱获得双倍收益: +' + get_doubox.data.awardCoin
            }
            resolve()
        })
    })
}

function showmsg() {

     $.msg($.name,$.sub,$.desc)

}

function formatJson(json,options){var reg=null,formatted='',pad=0,PADDING='    ';options=options||{};options.newlineAfterColonIfBeforeBraceOrBracket=(options.newlineAfterColonIfBeforeBraceOrBracket===true)?true:false;options.spaceAfterColon=(options.spaceAfterColon===false)?false:true;if(typeof json!=='string'){json=JSON.stringify(json);}else{json=JSON.parse(json);json=JSON.stringify(json)};json=json.replace(/([\{\}])/g,'\r\n$1\r\n');json=json.replace(/([\[\]])/,'\r\n$1\r\n');json=json.replace(/(\,)/g,'$1\r\n');json=json.replace(/(\r\n\r\n)/g,'\r\n');json=json.replace(/\r\n\,/g,',');if(!options.newlineAfterColonIfBeforeBraceOrBracket){json=json.replace(/\:\r\n\{/g,':{');json=json.replace(/\:\r\n\[/g,':[')};if(options.spaceAfterColon){json=json.replace(/\:/g,':')};(json.split('\r\n')).forEach(function(node,index){var i=0,indent=0,padding='';if(node.match(/\{$/)||node.match(/\[$/)){indent=1}else if(node.match(/\}/)||node.match(/\]/)){if(pad!==0){pad-=1}}else{indent=0};for(i=0;i<pad;i++){padding+=PADDING};formatted+=padding+node+'\r\n';pad+=indent});return formatted}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
