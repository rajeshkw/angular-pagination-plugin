(function () {
	angular
                .module('app.services.common.pagination',[])
                .factory('$pagination',['$rootScope','$http','appUrl',function($rootScope,$http,appUrl){
                    return {
                        items : [],
                        model: null,
                        data: null,
                        itemsPerPage: 10,
                        busy: false,
                        currentPage: 1,
                        count: 1,
                        pageCount: 1,
                        done: false,
                        action: 'index',
                        init: function(params){
                            this.model = params['model'] || null;
                            this.data = params['data'] || null;
                            this.items = params['items'] || [];
                            this.action = params['action'] || this.action;
                            this.count = params['count'] || this.count;
                            this.pageCount = params['pageCount'] || this.pageCount;
                            this.itemsPerPage = params['itemsPerPage'] || this.itemsPerPage;
                        },
                        searchData: function(params){
                            this.currentPage = 1;
                            this.done = false;
                            this.search = true;
                            this.fetch(params);
                        },
                        nextPage : function(params) {
                            this.search = false;
                            this.fetch(params);
                        },
                        fetch: function(params){
                            if (this.busy || this.done) return;
                            this.busy = true;
                            var url = appUrl + '/' + this.data + "/"+ this.action +"/page:" + this.currentPage + ".json",
                                $this = this;
                            $http.get(url,{
                                params: params,
                                transformRequest: function (data) {
                                    $('#ajax-loader').show();
                                    return data;
                                  }
                            }).success(function(data) {
                                this.count = data.pagination[this.model].count;
                                this.pageCount = data.pagination[this.model].pageCount;
                                this.items = data[this.data];
                                if(this.items.length===0){
                                    this.currentPage = 0;
                                }
                                this.busy = false;
                                $('#ajax-loader').hide();
                            }.bind(this))
                            .error(function(){
                                this.busy = false;
                                this.done = false;
                            });
                        }
                    };
                }]);

})();
