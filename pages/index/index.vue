<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper" autoplay indicator-dots circular>
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator url=""><image :src="item.image_src" mode="widthFix"></image></navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav">
			<view class="nav_son" @click="navClick(navurl[0])">
				<view class="iconfont icon-ziyuan haha"></view>
				<text>购物超市</text>
			</view>
			<view class="nav_son" @click="navClick(navurl[1])">
				<view class="iconfont icon-guanyuwomen"></view>
				<text>联系我们</text>
			</view>
			<view class="nav_son" @click="navClick(navurl[2])">
				<view class="iconfont icon-tupian"></view>
				<text>社区图片</text>
			</view>
			<view class="nav_son" @click="navClick(navurl[3])">
				<view class="iconfont icon-shipin"></view>
				<text>学习视频</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hotgoods">
			<view class="tit">推荐商品</view>
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
			// 轮播图
			swiperList: [],
			// 商品列表
			goodsList: [],
			// 商品列表的初始页码
			page: 1,
			// 触底线的显示和隐藏
			sole: false,
			// 点击4个导航跳转的地址
			navurl: ['/pages/goods/goods', '/pages/contact/contact', '/pages/pics/pics', '/pages/videos/videos']
		};
	},
	onLoad() {
		// 获取轮播图数据
		this.getSwiperList();
		// 获取商品列表数据
		this.getGoodsList();
	},
	// 页面触底的操作
	onReachBottom() {
		if(this.goodsList.length < this.page*10 ){
			return this.sole = true 
		}
		this.page++;
		console.log(123);
		// 获取商品列表数据
		this.getGoodsList();
	},
	methods: {
		// 获取轮播图数据
		getSwiperList() {
			uni.request({
				url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
				success: res => {
					if (res.statusCode !== 200) {
						uni.showToast({
							title: '获取轮播图数据失败',
							icon: 'none',
							duration: 2000
						});
					}
					this.swiperList = res.data.message;
					console.log(this.swiperList);
				}
			});
		},
		// 获取商品列表数据
		async getGoodsList() {
			const res = await uni.get('/api/getgoods?pageindex=' + this.page);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取商品失败');
			}
			console.log(res);
			this.goodsList = [...this.goodsList, ...res[1].data.message];
			console.log(this.goodsList);
		},
		// 点击nav导航区域
		navClick(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="less">
.swiper {
	width: 750rpx;
	height: 350rpx;
}
.swiper image {
	width: 100%;
	height: 100%;
}
.nav {
	display: flex;
	justify-content: space-around;
	.nav_son {
		text-align: center;
		margin-top: 10rpx;
		view {
			width: 120rpx;
			height: 120rpx;
			background-color: #c41e00;
			border-radius: 50%;
			line-height: 120rpx;
			color: #fff;
		}
		text {
			font-size: 30rpx;
			margin-top: 10rpx;
		}
	}
}
// 推荐商品
.hotgoods {
	background-color: #eee;
	overflow: hidden;
	margin-top: 10rpx;
	.tit {
		text-align: center;
		height: 50px;
		line-height: 50px;
		letter-spacing: 20rpx;
		color: #c41e00;
		background-color: #fff;
		margin: 10rpx 0;
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
