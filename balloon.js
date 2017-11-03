/**
 * Created by hh on 2017/11/2.
 */
/*
* [balloons] 打气球游戏
* 1、创建气球
* 2、气球随机上升飘起
* 3、点击当前气球消失
* 4、对应按键气球消失
* */
window.onload = function(){
    var bal = new Balloons();
}


function Balloons(){
    this._oBalloons = null; // 容器
    this._oBallKeycode = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var _self = this;
    this._rDom = null;
    this._oBallArr = []; // 气球数组
    this._oBody = document.body; // body
    this._oBallCount = 10;
    this._oBallPosi = {  // 气球位置
        left : this._oBody.clientWidth - 160,
        bottom : 0.5
    };
    this._oBallmove = 5; // 气球个数
    this._fragContent = null; // 虚拟dom
    this._timer = setInterval(function(){_self._manyBallMove()},100);
    this._evBalls = null; // 每个气球
    this._offse = null; // 气球offsetTop
    this._tIndex = 0; // 移除索引
    this._createBalloons(); // 创建气球

}
Balloons.prototype._createBalloons = function(num){
    var _self = this;
    this._fragContent = document.createDocumentFragment();
    for(var i=0;i<this._oBallCount;i++){
        this._rDom = Math.floor(Math.random() * this._oBallKeycode.length);
        this._oBalloons = document.createElement('div');
        this._oBalloons.className = 'app';
        this._oBalloons.style.left = (Math.random() * this._oBallPosi.left) + 'px';
        this._oBalloons.style.bottom = (Math.random() * this._oBallPosi.bottom) + 'px';
        this._oBalloons.innerHTML = this._oBallKeycode[this._rDom];
        this._fragContent.appendChild(this._oBalloons);
        this._oBallArr.push(this._oBalloons);
        this._oBallArr[i].addEventListener('click',function(){
            _self._ballClick(this);
        })
        
    }
    this._oBody.addEventListener('keydown',function(event){
        _self._keyDownEvent(event);
    })
    this._oBody.appendChild(this._fragContent);
}
Balloons.prototype._manyBallMove = function(){
    var that = this;
    for(var j=0;j<this._oBallArr.length;j++){
        this._evBalls = this._oBallArr[j];
        this._offse = this._evBalls.offsetTop;
        if(this._offse > 0){
            this._evBalls.style.top = this._offse - this._oBallmove + 'px';
        }
    }
}
Balloons.prototype._ballClick = function(df){
    df.parentNode.removeChild(df)
    if(this._oBallArr instanceof Array){
        this._tIndex = this._oBallArr.indexOf(df);
        this._oBallArr.splice(this._tIndex,1);
        if(this._oBallArr.length <= 0){
            this._createBalloons();
        }
    }
}
Balloons.prototype._keyDownEvent = function(event){
    if(typeof event.key == 'string'){
        for(var q=0;q<this._oBallArr.length;q++){
            if(this._oBallArr[q].innerHTML == event.key){
                this._oBallArr[q].parentNode.removeChild(this._oBallArr[q]);
                this._oBallArr.splice(q,1);
                if(this._oBallArr.length <= 0){
                    this._createBalloons();
                }
            }
        }
    }
}