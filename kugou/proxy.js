var express = require('express')
var app = express()
var request = require('request')
var cfg = require('./src/config/server.js')
const apis = {
  getSong: 'http://www.kugou.com/yy/index.php?r=play/getdata',
  searchSong: 'http://songsearch.kugou.com/song_search_v2?',
  getTheme: 'http://mobilecdngz.kugou.com/api/v3/theme/category?apiver=2&plat=0&tversion=1.10&version=8819',
  getEveryDayRec: 'http://everydayrec.service.kugou.com/everyday_song_recommend'
}

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/api/getSong', function(req, res) {
  console.log('getSong')
  request(`${apis.getSong}&hash=${req.query.hash}&album_id=${req.query.album_id}`, function(err, _res, body) {
    if (!err && _res.statusCode === 200) {
      res.send(body)
    } else {
      console.log(err)
    }
  })
})

app.get('/api/searchSong', function(req, res) {
  console.log('searchSong')
  let url = `${apis.searchSong}keyword=${encodeURI(req.query.keyword)}&page=${req.query.page}&pagesize=${req.query.pagesize}`
  console.log(url)
  request(url, function(err, _res, body) {
    if (!err && _res.statusCode === 200) {
      console.log(1)
      res.send(body)
    } else {
      console.log(err)
    }
  })
})

app.get('/api/getTheme', function(req, res) {
  console.log('getTheme')
  request(`${apis.getTheme}`, function(err, _res, body) {
    console.log(_res.statusCode)
    if (!err && _res.statusCode === 200) {
      res.send(body)
    } else {
      console.log(err)
    }
  })
})

app.get('/api/getEveryDayRec', function(req, res) {
  let now = new Date().getTime()
  request.post(apis.getEveryDayRec, {
    'clientver': 8819,
    'clienttime': now,
    'area_code': 1,
    'appid': 1100,
    'userid': 768060772
  }, function(err, _res, body) {
    if (!err && _res.statusCode === 200) {
      res.send(body)
    } else {
      console.log(err)
    }
  })
})
app.listen(cfg.port, cfg.host, function() {
  console.log(`proxy server listening at ${cfg.host}:${cfg.port}`)
})

// {
//   "mid": "258800549778501639557289198617128972816",
//   "clientver": 8819,
//   "key": "98feeac89026031b3d78f1e97c77386e",
//   "t2": "70bed7e5258652493fb4290e28e5f10cf87cbfb0bc24e552c01a9986fce5ae483bff8313926241f9985dae6d027a1953d29ee2ceb181cff81765e175fe595448d29ccf1f99034acc199a20c8d65a5ba1a00d90e3693af4c6993f2f3ab333e629bf023561c8d6ebce587685884ed02e6c",
//   "clienttime_ms": "1502080527754",
//   "uuid": "3cb570e7c0672d45901a70c910e6f213",
//   "appid": 1005,
//   "t1": "a355b5ae912729b3e190a8ed3d4f6f75f03beed4815554d0c674bf1a968dfa94bf6dc6b14df75c3feefe15b833d63cccccbbb32716e834ead17a3d006faff05c7670350e2d8faaad7ebac2fdf5c149ca4f96430e8f7ac8c610fd0ce681607c691492a2ee233d60e9bb5f44285bd0be97661ed3b48310cc9f48d14dfd35140a9f8fbfde4285431f50b8c2175eaeac585d3e071224fe1dae19132c83707cdccf4bca797bf338d69738b8a67dcc2766ada1",
//   "userid": "768060772",
//   "p2": "308EAAD54F94F1D3FF8FEE9F1F6BADD1A8739508A964A81B3566ECE33646D6FBC6B820F4E027177369AB0114FDA96FB1596B4DEEBAD2191F92EA4FFCB64033643E0743674B55BAC2F4C08AADB1BDDB193A1B5AD803E14A2E975BA4A64B47F9BE5A47CBB853EFEA2FC160D027CA68207D1D1650C46280CE9E3E488CE2520F5D4A"
// }

// request.post('http://login.user.kugou.com/v2/login_by_token', {
//   'mid': '258800549778501639557289198617128972816',
//   'clientver': 8819,
//   'key': 'd0925612f6a7609105bfd35ffeadd0c1',
//   't2': '70bed7e5258652493fb4290e28e5f10cf87cbfb0bc24e552c01a9986fce5ae483bff8313926241f9985dae6d027a1953d29ee2ceb181cff81765e175fe595448d29ccf1f99034acc199a20c8d65a5ba1eca529ac1e44fa62cb0fb5a6b9310118f275971ae628c02bb00462f988413839',
//   'clienttime_ms': '1502078680077',
//   'uuid': '3cb570e7c0672d45901a70c910e6f213',
//   'appid': 1005,
//   't1': 'a355b5ae912729b3e190a8ed3d4f6f75f03beed4815554d0c674bf1a968dfa94bf6dc6b14df75c3feefe15b833d63cccccbbb32716e834ead17a3d006faff05c6e21b9620edbc44a537c9b5e98d4485c9fe4df99a175fe57d11c7bef3873767de322ad65c12ac36bfe2e43ee864bc93e18e60e4d7b8705d7d170aac97338f4474b21c9ffe73014083e6a17ff6d6eb2b4a040eca8d33f60f15cf1cdc7fbaae1ab9734863c1c9f3bcc5fd435efe8d30473',
//   'userid': '768060772',
//   'p2': 'B3BA37168043C97C3ED2DEDFFBB4D213D9A4534B390418BFD5D696DE5A7BEFB03A5FF4F25E0967FAD988304B12D413940C18C5C425CDC77A32B45362ED7F2E47DFEBBE8D0B9E37AF286B0A635173F70B4F80ADC9743BD1AF38886A84BFF26ADB00130E28770A1F64B972F759BD6D8924E14F09AA97CA6F9CDD9410C1257D117A'
// }, function (err, res, body) {
//   if (err) {
//     console.log(res)
//   }
//   console.log(body)
// })

// request('http://everydayrec.service.kugou.com/everyday_song_recommend?platform=android&mid=258800549778501639557289198617128972816&clientver=8819&key=98332e57bdb1c8ca96d65fbb7d831ab5&clienttime=1502079211761&area_code=1&appid=1100&userid=768060772', function(err, res, body) {
//   if (err) {
//     console.log(res)
//   }
//   console.log(body)
// })
// 
// request.post('http://persnfm.service.kugou.com/personal_recommend', {
//   "appid": "1005",
//   "clientver": "8819",
//   "platform": "android",
//   "userid": 768060772,
//   "mid": "258800549778501639557289198617128972816",
//   "clienttime": "1502078368",
//   "key": "42754681cf36ad9d4ad3813569f8ba7e",
//   "mark_list": "99999999;1324201:48752,607584:46181,2863171:44190,1385619:42985,654921:42789,7822649:40790,1490463:40790,1248817:39803,1353926:37924,1245881:37443,9266735:37231,1328918:35362,618615:33712,1259183:33669,1333263:33340,1375268:33121,1404610:32991,9241040:32986,1347614:32744,9444988:32355,1321556:31507,638362:31395,1465474:30985,1375018:30886,1378776:30637,1315132:30311,1404437:30217,1380107:30214,637810:30153,1253631:29892,35726:28821,1343933:28721,1407587:28612,1272886:27376,1404337:27283,1241994:27243,1374961:27087,1315148:26824,1314454:26446,1311626:26321,1402241:26227,1281280:25813,1356079:25739,21774:25577,1433372:25541,1846140:25490,5842470:25490,7000458:25348,622532:25046,1379643:25016,7884126:24912,1328888:24885,607096:24863,1328920:24804,1276664:24670,9438826:24660,2718854:24594,1296852:24445,1405256:24394,1226554:24348,1664715:24234,1463174:24211,1344838:24193,1332000:24012,1444581:23988,1266544:23813,1314987:23493,2130487:23240,1375345:23070,3031224:23061,1268221:22781,604232:22777,612056:22712,1344516:22496,1310773:22450,5945249:22183,1315376:22138,1362491:22023,1407185:21958,1345650:21878,1323672:21820,8094285:21693,7842393:21600,1332118:21598,533523:21531,1322660:21475,1226630:21424,1362317:21324,1309480:21251,3094502:21090,1433491:21039,3536418:20580,7868179:20545,32991:20328,1454880:20145,1373013:20030,629276:19979,8630380:19907,604089:19777,1285431:19554,1433770:19548,1332386:19467,637096:19293,653938:19136,9381693:19079,8042127:18992,1322719:18841,1347792:18570,1353180:18548,9361682:18455,1430711:18348,1380903:18313,1385609:18209,4739451:18199,1242121:17888,605140:17878,1242116:17400,7870260:17400,9047312:17400,1380418:17371,1317222:17240,1361152:17193,9307632:17107,1386358:17070,9489701:17069,15013:16993,1401245:16963,9331642:16953,1461250:16889,1314753:16875,1331366:16785,9241164:16626,4185959:16553,534965:16454,71357:16444,9361693:16400,7932883:16326,2975720:16306,459179:16217,9361674:16177,1407015:16134,1357938:16103,1465385:15987,2945449:15976,22786:15901,3171450:15802,3810837:15802,602174:15715,1314663:15609,602416:15540,1347963:15533,1241804:15472,1408135:15456,1355115:15318,1404937:15278,10368:15258,1384691:15074,1244237:15045,54859:15030,9242189:14861,3169732:14653,603021:14648,1439934:14622,1309884:14489,1360438:14468,39215:14444,1313327:14436,2991889:14401,1297006:14249,1375243:14163,1682481:14146,9398516:14050,7980726:14005,1350724:13731,1323001:13726,1249768:13697,95982:13663,1386187:13646,8634646:13640,1358537:13597,1232638:13561,1253757:13533,1358127:13507,1791357:13501,1374327:13493,1236818:13455,1546804:13441,1338465:13370,1386583:13340,1319537:13319,1375657:13231,1440799:13083,628614:12980,1374949:12974,1537769:12962,1333916:12636,643377:12620,1365696:12576,574322:12547,1386171:12525,9260058:12502,1414717:12468,647303:12422,1386834:12358,603114:12352,602889:12264,1356720:12264,1379174:12221,1244234:12216,1244236:12119,9061255:12035,29216:11976,2002504:11960,1261469:11948,1435359:11934,1373414:11891,1317121:11875,1358689:11845,9245954:11773,8634644:11762,1385981:11762,452483:11762,1389958:11762,5843173:11762,4992613:11762,7380505:11762,7849818:11734,89777:11726,1434052:11703,1671026:11687,438827:11683,1606611:11630,1317123:11629,1375723:11618,9470634:11581,9407613:11552,1309525:11550,7982106:11443,1357449:11416,634549:11411,7837636:11411,2165236:11411,9241541:11411,1700514:11411,1326297:11411,2318252:11411,3758326:11411,1247101:11354,427174:11344,436580:11290,1385901:11250,1353332:11200,1384005:11184,1424871:11169,8387601:11131,8620956:11113,1442234:11094,567495:11089,1679842:11071,643279:11071,1319120:11062,1380529:11036,659096:11028,3854869:10993,9343030:10946,1442244:10946,1366681:10933,2158529:10895,1403014:10887,9241995:10829,1407176:10821,1327466:10755,1409855:10723,1304812:10685,8948498:10685,9034730:10663,1627453:10632,1391435:10615,7146347:10606,7146085:10606,7145976:10606,6430951:10606,1358533:10582,1236671:10556,8771606:10540,2497462:10540,1685821:10516,9245959:10475,1577576:10432,59224:10428,8020689:10428,9489618:10388,7822040:10373,1363728:10372,1401332:10354,9381683:10339,1442222:10330,1396535:10300,1431928:10261,1312346:10198",
//   "hash_like_list": "3447e828ec0a747982f83c9468d47086-c8013e14823638d923bc9ee3dbd76e63-2f8ef65ea22811bf5f9ea88cdf13a1a8-5dfafab0bdb6250cae1d82b0d1b46019-c75ec4ddf4c528b18829445eb6ad2fbc",
//   "action": "login",
//   "area_code": "1",
//   "client_playlist": [{
//     "h": "9b5a5d757264bf846f019efd141b97cd",
//     "v": "3|3|0|1-0-0|1-0-0"
//   }, {
//     "h": "5999c71e5999d5c00c916f85ff931628",
//     "v": "0|1|0|14-0-0|0-0-0"
//   }, {
//     "h": "0342a5a01849acdfe02a9d657a0f2dc2",
//     "v": "0|1|0|2-0-0|1-0-0"
//   }, {
//     "h": "2f8ef65ea22811bf5f9ea88cdf13a1a8",
//     "v": "3|1|0|1-0-0|2-0-0"
//   }, {
//     "h": "c952fe28c72fc37a49cb99d616f77b98",
//     "v": "3|1|0|2-0-0|2-0-0"
//   }, {
//     "h": "7fbd4fe5947eae47be4623eaf6210de5",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "9fafef592e81a58b11c66f762a4bc3f0",
//     "v": "0|0|0|2-0-0|0-0-0"
//   }, {
//     "h": "faf40ec4bc220d9a159a4f4654695853",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "8274cd8accacd378e7d7c52290098bac",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "5ab91964e5d3b6f64cd86d873c671b23",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "07d7db0060dc81833436b461055043e5",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "4dec418bdef7abf5d223613f7b002d37",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "ee72d0b863f33b613865b04de915fc91",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "ee19eeb2874b6068102fcd4e9e992e46",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "878fe6cc9d12ac000db7a74de10e49e9",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "e4c44b162b7eebc3c99ad81e9f7b41f9",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "3b4d7eb89573bc80b4a1eadd3740d0d1",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "1db2f3e5587f93d246cd3e5c75fadf9c",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "1b7af40c8d6dff31baa139627ef3c8ef",
//     "v": "0|0|0|1-0-0|2-0-0"
//   }, {
//     "h": "32c11535f74513058cbfed529e1e3efe",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "75d36a418d866f05f679c4a0017deb4c",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "5c4a8d59340394e8616443638ee995ac",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "5c53b43214d302ecf1878d415214b2b7",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "c62734d8a418a66867f7821cc01213d9",
//     "v": "0|1|0|4-0-0|1-0-0"
//   }, {
//     "h": "6c41362607db06a067cdfdae146cab95",
//     "v": "3|1|0|3-0-0|0-0-0"
//   }, {
//     "h": "5d222b05765c8679ce9c930b0f19b738",
//     "v": "0|1|0|2-0-0|1-0-0"
//   }, {
//     "h": "3447e828ec0a747982f83c9468d47086",
//     "v": "3|1|0|3-0-0|0-0-0"
//   }, {
//     "h": "f177383eb575b674654cbbb6bcc130ff",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "19fa9f5490c06343c3b7af84fb4b19d6",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "c1309920e65d975bcedea737af455566",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "5e64f542a8a94e0a6ca17c928b937cd7",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "0b84b4ecefb8ae07a90b126a40984083",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "4767fa60b3eef8675ea07facbbac288c",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "36d724fe73e6bde79e03f3cedf417dd0",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "493b5734792135d917cd71c3f9ea40e7",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "73bdcddd86cdd74e7fdb4595ab13f675",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "813b9a32446b6e8bad067126c6dcf195",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "1a546ffc82c5c138850da9f5272a8773",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "2d5dc6a0958749f574f5d8be3251899c",
//     "v": "0|0|0|0-0-0|3-0-0"
//   }, {
//     "h": "545280a9569b5733e9e085449775cdf2",
//     "v": "0|0|0|0-0-0|3-0-0"
//   }, {
//     "h": "8aeff6e1dde5a78d4c5876a2ea22af4b",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "e19d7068f96a1db658e29396aacea10d",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "af943e3f3655480e67274184001ff0e7",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "f2c8f203660f1c4657c38bd58a33b82b",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "49c204f7c644c8238ca49cf19ab64dc9",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "1eb6cb793975c8521cff2766ca15637d",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "4e519609cd436efee3497e98641587ad",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "70cf8adac4114069c0bdc36d1bdab144",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "88c15c596ffa1404ee73462568987f16",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "c8013e14823638d923bc9ee3dbd76e63",
//     "v": "3|3|0|1-0-0|1-0-0"
//   }, {
//     "h": "e90681fd498cb7860f381e85e21a863f",
//     "v": "0|3|0|2-0-0|0-0-0"
//   }, {
//     "h": "17836aea3589aa68fbb48de1ed939055",
//     "v": "0|1|0|2-0-0|1-0-0"
//   }, {
//     "h": "16d72d9c74399b3ced1ad3a9b70f25ca",
//     "v": "0|3|0|1-0-0|1-0-0"
//   }, {
//     "h": "97e0f87628fc4bb0aa524ffdb6eb40a3",
//     "v": "0|3|0|1-0-0|0-0-0"
//   }, {
//     "h": "8fc438e2b0de5ecfb2536b042b6cea87",
//     "v": "3|3|0|1-0-0|0-0-0"
//   }, {
//     "h": "5dfafab0bdb6250cae1d82b0d1b46019",
//     "v": "3|1|0|2-0-0|0-0-0"
//   }, {
//     "h": "facee1e1c8bf0f5c4d94e0cca9421688",
//     "v": "3|3|0|3-0-0|0-0-0"
//   }, {
//     "h": "42b8a1147919e3adac03aba323f26113",
//     "v": "0|1|0|1-0-0|2-0-0"
//   }, {
//     "h": "d9a7edfc10af6f7397f68014f6fff053",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "ea90c575598468f80f1d068d974436bd",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "7380cd603003f06a54525ad76bf1bf12",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "c5f6ea5cfaed8c3cc60308d5d5ab9558",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "c3c88c9503bd3ab174b7f81c93746ed4",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "90c1aee94bb099aa312938ef55fd3272",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "86c01844c4cce7f03f695bdd418759a5",
//     "v": "0|0|0|2-0-0|1-0-0"
//   }, {
//     "h": "940f7a848f7e03fe056984dcdfb3a81c",
//     "v": "0|0|0|2-0-0|0-0-0"
//   }, {
//     "h": "433bb9653ab1d2eddebe16cfc2fca249",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "7e10343f480aa66720baf44b698f5529",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "7e9bb12fce8dfc86d954bf47e9b98622",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "4efd1defe6625021e0baf632e64dc336",
//     "v": "0|0|0|2-0-0|1-0-0"
//   }, {
//     "h": "7ab8c8165f61978dd0d8aa023a15e332",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "b28dae626d28088cca79f37b1d986326",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "53287771d52765f638976ea290b21e97",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "f681953affb452ba9cb8b04e84694fd1",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "baa475c85dc193ba1815a5b92b2d6737",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "e401b5dfc002dcd0e18f31e44b1f06a6",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "4b2aaeecdae6e2efbd3fa04f69922a2f",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "2d53b01775ededf60b77661cf03f9d4c",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "9a0d5a2e1215cf6bb4d3e7c54cdcb7d7",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "723f55a3252d7002e440ca21ba9d50aa",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "31d961dfffe64d2d968a80863b325c26",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "1b0b728c93b9d9ade2193b6f03c88f8d",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "32278fd4efcc62c3f4c3a545b6fe00c9",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "116dbca0326d0b3a0f7dd20aab7a0e0a",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "fe53d4adc5c14a85c4448f7d26dfabe1",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "330102a37bf424abfe16fbe5acf53789",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "20a04cc7675e5d71ec88d363d0ba8494",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "6a4b55bd19b58e62d9ffae6854142b51",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "11974c34da0750d965d39cdf98ee63b2",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "df10fcc5758dd3df89a00044d5404e9f",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "792e70953de30f9dc4f6f7db068c55ad",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "c0b7c60825e3d0d997695dccccaebe5e",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "197d9a025943a1b05b1f808d8ba6b056",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "bc8f956ab780b66538d8c17d5ec79fe5",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "1a403be34b88cb02c4744c466ef4426c",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "19172d24e36da6757b0e081d779a071b",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "024638c747904c92484bbf08dae17802",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "23081da38ec018f41ec33e21dfbfcd38",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "bf6dac2ad93e2d53b55f4b8f8a209832",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "9f6f9e71e35e012b7ea42f7be60d8ae3",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "7c5ec625115808dbcf14cf0393dba7b7",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "d1cdae4633963471913ab1a5333b16eb",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "28d2981de33ff4db20bb62583653bdfe",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "932a39085ffba8ade03826a5963f405e",
//     "v": "0|0|0|2-0-0|1-0-0"
//   }, {
//     "h": "f4b2c45cc0a667df4ad62d4178a4bf96",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "c11c694603724096a6ecf96f96b311b7",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "d9d858dafb656cebe9d3fa0d17b0d8e3",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "f04bc5a7510c1422a32e293b3142f521",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "302e0e29d817203dda894662f690f0f5",
//     "v": "0|0|0|2-0-0|1-0-0"
//   }, {
//     "h": "b1d9655ea28b068cace2a1bbab3331f8",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "6134e2012198223219a58703ab1aa9ea",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "1cfee39d2ae2941051c3cd5b27c26a0b",
//     "v": "0|3|0|0-0-0|2-0-0"
//   }, {
//     "h": "8755995f188ba68fee37090532ba179a",
//     "v": "0|0|0|1-0-0|2-0-0"
//   }, {
//     "h": "d556b3bbba492fe13cd0141a72de5e68",
//     "v": "0|0|0|0-0-0|1-0-0"
//   }, {
//     "h": "a656f9aeb58774baea1af693c1d53428",
//     "v": "0|1|0|3-0-0|2-0-0"
//   }, {
//     "h": "378bec14cfadf326d1eac6cfb885c006",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "c68528862b479d9cbe525b097789258e",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "841f61c0ec9636b0a95dd8628de7f485",
//     "v": "0|0|0|1-0-0|2-0-0"
//   }, {
//     "h": "f4a9e9971fa9e5b6abdee2d30274f953",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "168ece5d67885b5fe628384ce53bb7e4",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "c21ff3b6ec5a9eff762187f0cdc4afb3",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "27c06e5c5eaf7ede0e41c874d225a772",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "69ba3ee74a73a614e6311df25b6b37fa",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "2fedd896e3bffa0d990502b2bbe8be5b",
//     "v": "0|0|0|0-0-0|2-0-0"
//   }, {
//     "h": "20be60b24e8eb0f1acb69d750a6bd837",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "feca9d8b0a2522730cce2b53feed27ff",
//     "v": "0|0|0|1-0-0|1-0-0"
//   }, {
//     "h": "9223fb90757800bd4c8630fd00ed6310",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "68cf783c24d69955d701c105d73baf81",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "29c37108b5aeb1339d7bc3ac17ac92e1",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "31b754b1f02193941313a2ac8a686231",
//     "v": "0|0|0|1-0-0|0-0-0"
//   }, {
//     "h": "61978a95d4d8fdf6920210e58658f7b8",
//     "v": "0|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "c75ec4ddf4c528b18829445eb6ad2fbc",
//     "v": "3|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "d9fb6d61850160cee688f355379367bb",
//     "v": "3|3|0|0-0-0|0-0-0"
//   }, {
//     "h": "8498df3a7f05b4e886de6ba1dc828376",
//     "v": "3|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "572e3ea8eda638160235f55343294e37",
//     "v": "3|1|0|0-0-0|0-0-0"
//   }, {
//     "h": "61b83ecb98c7a726ba1dbc08dd606700",
//     "v": "3|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "28aa16a2b003b0e468a451191fa90c04",
//     "v": "3|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "c2e437e058a97074e6122f16479b50a0",
//     "v": "3|0|0|0-0-0|0-0-0"
//   }, {
//     "h": "d24ab60682de365b237971c65df1840c",
//     "v": "0|3|0|0-0-0|0-0-0"
//   }, {
//     "h": "77836d683f22b2400edfe8c111ee8d2e",
//     "v": "0|3|0|0-0-0|0-0-0"
//   }]
// }, function(err, res, body) {
//   console.log(body)
// })
// 
request.get(apis.getEveryDayRec, {
  'clientver': 8819,
  'clienttime': new Date().getTime(),
  'area_code': 1,
  'appid': 1100,
  'userid': 768060772
}, function(err, _res, body) {
  console.log(body)
  if (!err && _res.statusCode === 200) {
    // res.send(body)
  } else {
    console.log(err)
  }
})
