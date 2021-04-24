/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
    el: '#player',
    data: {
        //歌名
        query: '',
        //歌曲
        musicList: [],
        //歌曲播放地址
        musicUrl: "",
        //歌曲封面
        musicCover: '',
        //歌曲评论
        hotComments: [],
        // 播放动画
        isplaying: false,
        //遮罩层的显示状态
        isShow: false,
        // mv的地址
        mvUrl: ''
    },
    methods: {
        searchMusic: function() {
            var that = this
            axios.get('https://autumnfish.cn/search?keywords=' + this.query).then(function(response) {
                // console.log(response.data.result.songs);
                //将获取的歌单里面的名字发送到左侧
                that.musicList = response.data.result.songs
            }, function(err) {

            })
        },
        playMusic: function(musicId) {
            // console.log(musicId);
            var that = this;
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
                function(response) {
                    console.log(response);
                    // console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                },
                function(err) {},
                // 歌曲详情获取  获取歌曲封面
                axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
                .then(function(response) {
                    // console.log(response);
                    that.musicCover = response.data.songs[0].al.picUrl
                })
            );
            //歌曲评论获取
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
                .then(response => {
                    // console.log(response);
                    console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments
                })

        },
        //音乐播放显示动画
        play: function() {
            this.isplaying = true
        },
        //音乐停止，停止动画
        pause: function() {
            this.isplaying = false

        },
        //播放mv
        playMv: function(mvid) {
            var that = this
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response) {
                    console.log(response.data.data.url);
                    that.isShow = true
                    that.mvUrl = response.data.data.url
                }, function(err) {

                })
        },
        hide: function() {
            this.isShow = false
            this.mvUrl = ''
        }
    }

})