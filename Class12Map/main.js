
var APP = {
    data: [],
    location: {},
    points: [],
    nearPoints: {
        set: [

        ],
        hasNearPoint: function (spec) {
            let point = spec.point;
            for (let i = 0; i < this.set.length; i++) {
                let set2 = this.set[i];
                for (let j = 0; j < set2.length; j++) {
                    let dis = map.getDistance(point, set2[j].point);
                    if (dis < 50000) {
                        set2.push(spec);
                        return true;
                    }
                }
            }
            this.set.push([spec]);
        }
    },
    button : function(){

    },
    start : true
};

APP.button.prototype = new BMap.Control();

APP.button.prototype.initialize = function (map) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode("停止轮播"));
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.left = "100px";
    div.style.backgroundColor = "white";
    div.onclick = function () {
      if(APP.start){
        APP.start = false;
        this.innerHTML = "继续轮播";
      }
      else{
        APP.start = true;
        this.innerHTML = "停止轮播";
      }
    };
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
  }

window.onload = function () {
    (function () {
        var url = "data.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = JSON.parse(request.responseText);
                for (var i = 0; i < json.length; i++) {
                    APP.data[i] = json[i];
                }
                (function () {
                    var url = "location.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
                    var request = new XMLHttpRequest();
                    request.open("get", url);/*设置请求方法与路径*/
                    request.send(null);/*不发送数据到服务器*/
                    request.onload = function () {/*XHR对象获取到返回信息后执行*/
                        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                            APP.location = JSON.parse(request.responseText);
                            /* for (var i in json) {
                                data[i] = json[i];
                            } */
                        }
                        //console.log(APP.location);
                        initMap();//创建和初始化地图
                    }
                })();
            }

            //console.log(APP.data);
        }
    })();

    //创建和初始化地图函数：
    function initMap() {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        var myZoomCtrl = new APP.button();
        // 添加到地图当中
        map.addControl(myZoomCtrl);
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(104.114129, 37.550339);//定义一个中心点坐标
        map.centerAndZoom(point, 5);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局

        new Promise(function (resolve, reject) {
            getNearPoints();
            let id = setInterval(function () {
                console.log(APP.nearPoints.set.length);
                if (APP.points.length >= 48) {
                    resolve(APP.nearPoints.set);
                    clearInterval(id);
                }
            }, 100)

        })
            .then(showPoints);
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        map.addControl(ctrl_sca);
    }

    function getNearPoints() {
        for (let i = 0; i < APP.data.length; i++) {
            let myGeo = new BMap.Geocoder();

            new Promise(function (resolve, reject) {
                let I = i;
                //let id = setInterval(function(){
                myGeo.getPoint(APP.location[APP.data[i].school], function (point) {


                    if (point) {
                        APP.points.push({
                            point: point,
                            data: APP.data[I]
                        });
                        if (APP.nearPoints.hasNearPoint({
                            point: point,
                            data: APP.data[I]
                        })) {
                            resolve(APP.data[I]);
                        }
                    }
                    else {
                        console.log(APP.data[i]);
                    }

                }, "中国");
                //},100);

            })



        }

    }
    //jQuery.subscribe("done", f2);
    function showPoints(set) {
        let time = 0;
        let container = {};
        window.lables = [];
        APP.now = 0;
        setInterval(function () {
            updatePoints();
        }, 2000);
        for (let i = 0; i < set.length; i++) {
            let set2 = APP.nearPoints.set[i];
            let markerSet = [];
            let content = "";

            for (let j = 0; j < set2.length; j++) {
                let point = set2[j].point;
                let data = set2[j].data;
                let marker = new BMap.Marker(point);
                container[data.school] || (container[data.school] = "");
                container[data.school] += data.name + "<br>"

                content += data.name + "：" + data.school + "<br>";

                marker.addEventListener("click", function () {
                    //alert(container[data.school]);
                    //let label = new BMap.Label(container[data.school]);
                    //marker.setLabel(label);
                    var opts = {
                        //width : 250,     // 信息窗口宽度    
                        //height: 100,     // 信息窗口高度    
                        title: "在" + data.school + "的同学"  // 信息窗口标题   
                    }
                    var infoWindow = new BMap.InfoWindow(container[data.school], opts);  // 创建信息窗口对象    
                    map.openInfoWindow(infoWindow, point);      // 打开信息窗口
                });



                markerSet.push(marker);
                map.addOverlay(marker);
                //let label = new BMap.Label(content);
                //markerSet.setLabel(label);
                //content += "<br>";
            }
            let cl = new BMapLib.MarkerClusterer(map, { markers: markerSet });
            if (time === 0) {
                for (let i in cl) {
                    console.log(i + ":" + cl[i]);
                }
                time++;
            }
            //let label = new BMap.Label(content);
            //set2[set2.length - 1].point.setLabel(label);
            /* cl.addEventListener("click", function(){   
                var opts = {       
                    title : "在这片区域的同学"  // 信息窗口标题   
                }    
                var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象    
                map.openInfoWindow(infoWindow, point);      // 打开信息窗口
            }); */

            let opts = {
                title: "在这片区域的同学"
            }

            let label = new BMap.InfoWindow(content, opts);
            //map.addOverlay(label);
            lables.push(label);
            for (let i = 0; i < lables.length; i++) {
                //map.removeOverlay(lables[i]);
            }
        }
    }
    function updatePoints() {
        //console.log(map.getZoom());
        
        if (map.getZoom() <= 6 && APP.now + 1 < lables.length && APP.start) {
            //map.addOverlay(lables[APP.now]);
            
            let set2 = APP.nearPoints.set[APP.now];
            map.openInfoWindow(lables[APP.now], set2[set2.length - 1].point);
            APP.now ++;
        }
        if(!(APP.now + 1 < lables.length && APP.start)){
            APP.now = 0;
        }
        if (APP.now === 0) {
            //map.removeOverlay(lables[lables.length - 1]);
        }
        else {
            //map.removeOverlay(lables[APP.now - 1]);
        }
    }

};