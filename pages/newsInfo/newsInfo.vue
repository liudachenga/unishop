<template>
	<view>
		<view class="dad">
			<view class="titie">{{ newsInfo.title }}</view>
			<view class="name">
				<text>{{ newsInfo.add_time | format1('yyyy-MM-dd')}}</text>
				<text>浏览:{{ newsInfo.click }}</text>
			</view>
			<rich-text :nodes="newsInfo.content"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 资讯详请列表
			newsInfo:[]
		};
	},
	// 局部时间过滤器
	filters: {
		// formDate: function(date){
		//       const nDate = new Date(date)
		// 	  const year = nDate.getFullYear()
		// 	  const month = nDate.getMonth().toString().padStart(2,0)
		// 	  const day = nDate.getDate().toString().padStart(2,0)
		// 	  return year + '-' + month + '-' + day
		//     }
		
		format1 : function(value, arg) {
		      function dateFormat(date, format) {
		        if (typeof date === "string") {
		          var mts = date.match(/(\/Date\((\d+)\)\/)/);
		          if (mts && mts.length >= 3) {
		            date = parseInt(mts[2]);
		          }
		        }
		        date = new Date(date);
		        if (!date || date.toUTCString() == "Invalid Date") {
		          return "";
		        }
		        var map = {
		          "M": date.getMonth() + 1, //月份 
		          "d": date.getDate(), //日 
		          "h": date.getHours(), //小时 
		          "m": date.getMinutes(), //分 
		          "s": date.getSeconds(), //秒 
		          "q": Math.floor((date.getMonth() + 3) / 3), //季度 
		          "S": date.getMilliseconds() //毫秒 
		        };
		        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
		          var v = map[t];
		          if (v !== undefined) {
		            if (all.length > 1) {
		              v = '0' + v;
		              v = v.substr(v.length - 2);
		            }
		            return v;
		          } else if (t === 'y') {
		            return (date.getFullYear() + '').substr(4 - all.length);
		          }
		          return all;
		        });
		        return format;
		      }
		      return dateFormat(value, arg);
		    }
	},
	onLoad(option) {
		// 获取资讯详请
		this.getMessage(option.id);
		console.log(option.id)
	},
	methods: {
		// 获取资讯详请
		async getMessage(id) {
			const res = await uni.get('/api/getnew/' + id);
			console.log(res);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取资讯详请列表失败');
			}
			this.newsInfo = res[1].data.message[0];
			console.log(this.newsInfo);
		}
	}
};
</script>

<style>
.dad {
	padding: 20rpx;
}
.titie {
	text-align: center;
	font-size: 36rpx;
}
.name {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}
</style>
