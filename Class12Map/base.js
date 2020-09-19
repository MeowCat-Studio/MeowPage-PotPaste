var points = [];

        for (let i = 0; i < APP.data.length; i++) {
            //console.log(APP.location[APP.data[i].school]);
            let myGeo = new BMap.Geocoder();
            let near = false;

            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(APP.location[APP.data[i].school], function (point) {
                if (point) {
                    points.push(point);
                    let j = i;
                    loop1: for (; j < points.length; j++) {
                        
                        let dis = map.getDistance(point,points[i]);
                        if (dis < 50000) {
                            near = true;
                            break loop1;
                        }
                    }
                    //map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                    let opts = {
                        position: point,    // 指定文本标注所在的地理位置

                    }
                    if(near){
                        opts.offset = new BMap.Size(0, 30)    //设置文本偏移量
                    }
                    let label = new BMap.Label(APP.data[i].name + "<br>" + APP.data[i].school, opts);  // 创建文本标注对象
                    label.setStyle({
                        color: 'blue',
                        fontSize: '12px',
                        height: '40px',
                        lineHeight: '20px',
                        fontFamily: '微软雅黑'
                    });
                    map.addOverlay(label);
                }
            },
                "中国");

        }

//
var APP = {
    data: [],
    location: {},
    points : [],
    nearPoints: {
        set : [

        ],
        hasNearPoint : function(spec){
            let point = spec.point;
            for(let i = 0;i < this.set.length;i ++){
                let set2 = this.set[i];
                for(let j = 0;j < set2.length;j ++){
                    let dis = map.getDistance(point,set2[j].point);
                    if(dis < 50000){
                        set2.push(point);
                        return true; 
                    }
                }
            }
            this.set.push([spec]);
        }
    }
};

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
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(104.114129, 37.550339);//定义一个中心点坐标
        map.centerAndZoom(point, 5);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
        new Promise(function(resolve,reject){
            getNearPoints();
            let id = setInterval(function(){
                if(APP.nearPoints.set.length >= 7){
                    resolve(APP.nearPoints.set);
                    clearInterval(id);
                }
            },100)
            
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

            myGeo.getPoint(APP.location[APP.data[i].school], function (point) {
                if (point) {
                    APP.points.push({
                        point : point,
                        data : APP.data[i]
                    });
                    if(APP.nearPoints.hasNearPoint({
                        point : point,
                        data : APP.data[i]
                    })){
                        
                    }
                }
                
            }, "中国");
            
            
        }
        
    }
    //jQuery.subscribe("done", f2);
    function showPoints(set){
        for(let i = 0;i < set.length;i ++){
            let set2 = APP.nearPoints.set[i];
            let markerSet = [];
            //console.log(set2)
            for(let j = 0;j < set2.length;j ++){
                let point = set2[j].point;   
                markerSet.push(new BMap.Marker(point));
                //map.addOverlay(markerSet[j]);
            }
            new BMapLib.MarkerClusterer(map, {markers:markerSet});
        }
    }


};

//point qian
var APP = {
    data: [],
    location: {},
    points : [],
    nearPoints: {
        set : [

        ],
        hasNearPoint : function(point){
            for(let i = 0;i < this.set.length;i ++){
                let set2 = this.set[i];
                for(let j = 0;j < set2.length;j ++){
                    let dis = map.getDistance(point,set2[j]);
                    if(dis < 50000){
                        set2.push(point);
                        return true; 
                    }
                }
            }
            this.set.push([point]);
        }
    }
};

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
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(104.114129, 37.550339);//定义一个中心点坐标
        map.centerAndZoom(point, 5);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
        new Promise(function(resolve,reject){
            getNearPoints();
            let id = setInterval(function(){
                if(APP.nearPoints.set.length >= 7){
                    resolve(APP.nearPoints.set);
                    clearInterval(id);
                }
            },100)
            
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

            myGeo.getPoint(APP.location[APP.data[i].school], function (point) {
                if (point) {
                    APP.points.push(point);
                    if(APP.nearPoints.hasNearPoint(point)){
                        
                    }
                }
                
            }, "中国");
            
            
        }
        
    }
    //jQuery.subscribe("done", f2);
    function showPoints(set){
        for(let i = 0;i < set.length;i ++){
            let set2 = APP.nearPoints.set[i];
            let markerSet = [];
            //console.log(set2)
            for(let j = 0;j < set2.length;j ++){
                let point = set2[j];   
                markerSet.push(new BMap.Marker(point));
                map.addOverlay(markerSet[j]);
            }
            new BMapLib.MarkerClusterer(map, {markers:markerSet});
        }
    }


};

