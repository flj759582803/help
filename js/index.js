//分页
Vue.component('vue-page', {
    template: '#page',
    data: function () {
        return {
            pageNow: 1,
            pageLen: 0
        }
    },
    methods: {
        render: function (page, total) {
            this.pageNow = 1;
            this.pageLen = Math.ceil(total / page);
        },
        go: function (n) {
            this.pageNow = n;
            this.$emit('page', this.pageNow);
        },
        prev: function () {
            this.pageNow--;
            this.$emit('page', this.pageNow);
        },
        next: function () {
            this.pageNow++;
            this.$emit('page', this.pageNow);
        }
    }
    /*watch: {
        pageNow: function () {
            this.$emit('page', this.pageNow);
        }
    }*/
});

// 标题以下部分
Vue.component('vue-content', {
    template: '#content',
    data: function () {
        return {
            isShowDetail: false,
            detail: {},
            list: [],
            page: 1,
            rows: 10,
            total: 0,
            data: {
                billType: '',
                attachmentName: '',
                condition: ''
            }
        }
    },
    methods: {
        findList: function (params) {
            var _this = this;
            this.data.billType = params.billType || '';
            this.data.attachmentName = params.attachmentName || '';
            this.data.condition = params.condition || '';

            axios.post('json/tsconfig.json', {
                page: params.isClick ? _this.page : _this.page = 1,
                rows: _this.rows,
                data: _this.data
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).then(function (res) {
                _this.list = res.data.rows;
                _this.isShowDetail = false;
                _this.detail = {};
                _this.$emit('answer', '');
                if (!params.isClick) {
                    setTimeout(function () {
                        _this.$refs.page.render(_this.rows, res.data.total);
                    }, 0);
                }
            }).catch();
        },
        clickPage: function (page) {
            this.page = page;
            this.findList({isClick: true});
        },
        showDetail: function (id) {
            this.isShowDetail = true;
            this.detail = _.find(this.list, function (item) {
                return item.id == id;
            });
            this.$emit('answer', this.detail.qaDesc);
        },
        back:function () {
            this.isShowDetail = false;
        }
    },
    mounted: function () {
        this.findList({});
    }
});

new Vue({
    el: '#app',
    data: {
        category: [],
        billType: '',
        billTypeName: '全部',
        attachmentName: '',
        condition: '',
        qaDesc: ''
    },
    methods: {
        findListByCategory: function (billType) {
            var _this = this;
            _this.billType = billType;
            if (_this.billType) {
                var c = _.find(_this.category, function (item) {
                    return item.billType == _this.billType;
                });
                _this.billTypeName = c.billTypeName;
            } else {
                _this.billTypeName = '全部';
            }
            _this.attachmentName = '';
            _this.condition = '';
            _this.$refs.list.findList({
                billType: _this.billType,
                ttachmentName: _this.attachmentName,
                condition: _this.condition,
                page: 1
            });
        },
        findListByAttachmentName: function () {
            var _this = this;
            _this.$refs.list.findList({
                billType: _this.billType,
                attachmentName: _this.attachmentName,
                condition: _this.condition
            });
        },
        answer: function (qaDesc) {
            this.qaDesc = qaDesc || '';
        },
        back:function () {
            this.qaDesc = '';
            this.$refs.list.back();
        }
    },
    mounted: function () {
        var _this = this;
        axios.get('json/maincategory.json').then(function (res) {
            _this.category = res.data;
        }).catch();
    }
});
