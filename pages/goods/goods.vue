<template>
	<view>
		<view class="hotgoods">
			<view class="tit"></view>
			<goodsList :goodsList="goodsList"></goodsList>
		</view>
		<!-- 触底线 -->
		<view class="buttom" v-show="sole">--我也是有底线的--</view>
	</view>
</template>

<script>
// 引入商品列表组件
import goodsList from '../../components/goods-list/goods-list.vue';
export default {
	components: { goodsList },
	data() {
		return {
			// 商品列表
			goodsList: [],
			// 商品列表的初始页码
			page: 1,
			// 触底线的显示和隐藏
			sole: false
		};
	},
	onLoad() {
		// 获取商品列表数据
		this.getGoodsList();
	},
	// 页面触底的操作
	onReachBottom() {
		if (this.goodsList.length < this.page * 10) {
			return (this.sole = true);
		}
		this.page++;
		console.log(123);
		// 获取商品列表数据
		this.getGoodsList();
	},
	// 下拉刷新的操作
	onPullDownRefresh() {
		this.goodsList = [];
		this.page = 1;
		this.sole =false;
		setTimeout(()=>{
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},1000)
	},
	methods: {
		// 获取商品列表数据
		async getGoodsList(callback) {
			const res = await uni.get('/api/getgoods?pageindex=' + this.page);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取商品失败');
			}
			console.log(res);
			this.goodsList = [...this.goodsList, ...res[1].data.message];
			console.log(this.goodsList);
			callback && callback()
		}
	}
};
</script>

<style lang="less">
// 推荐商品
.hotgoods {
	background-color: #eee;
	overflow: hidden;
	.tit {
		margin: 10rpx 0 0;
	}
}
// 触底线
.buttom {
	text-align: center;
	font-size: 26rpx;
	margin: 5rpx 0;
	color: #ccc;
}
</style>
