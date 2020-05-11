<template>
	<view>
		<!-- 轮播图 -->
		<view class="box1">
			<swiper class="swiper" autoplay indicator-dots circular>
				<swiper-item v-for="item in swiperList" :key="item.goods_id"><image class="haha" :src="item.src"></image></swiper-item>
			</swiper>
		</view>
		<!-- 商品详情 -->
		<view class="box2">
			<view class="moeny">
				<text class="new">¥2199</text>
				<text class="old">¥2699</text>
			</view>
			<view class="title">{{ detailList.title }}</view>
			<view class="line"></view>
			<view class="type">
				<view>货号: {{ detailList.goods_no }}</view>
				<view>库存: {{ detailList.stock_quantity }}</view>
			</view>
			<view class="line"></view>
		</view>
		<!-- 商品描述 -->
		<view class="box3">
			<view class="detail">详情介绍:</view>
			<rich-text :nodes="describeList.content"></rich-text>
		</view>
		<view class="shop"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
export default {
	components: { uniGoodsNav },
	data() {
		return {
			// 轮播图数据列表
			swiperList: [],
			// 商品详情
			detailList: {},
			// 商品描述
			describeList: {},
			options: [
				{
					icon: 'headphones',
					text: '客服'
				},
				{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad(option) {
		this.getSwiper(option.id);
		this.getDetail(option.id);
		this.getDescribe(option.id);
	},
	methods: {
		// 获取轮播图
		async getSwiper(id) {
			const res = await uni.get('/api/getthumimages/' + id);
			// console.log(res);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取轮播图数据失败');
			}
			this.swiperList = res[1].data.message;
			// console.log(this.swiperList);
		},
		// 获取商品详情列表
		async getDetail(id) {
			const res = await uni.get('/api/goods/getinfo/' + id);
			// console.log(res);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取商品详情数据失败');
			}
			this.detailList = res[1].data.message[0];
			console.log(this.detailList);
		},
		// 获取商品描述列表
		async getDescribe(id) {
			const res = await uni.get('/api/goods/getdesc/' + id);
			// console.log(res);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取商品描述数据失败');
			}
			this.describeList = res[1].data.message[0];
			console.log(this.describeList);
		},
		// 底部商品导航
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			console.log(e);
			this.options[2].info++;
		}
	}
};
</script>

<style lang="less">
.box1 {
	margin-top: 20rpx;
	.swiper {
		height: 550rpx;
	}
}

.box2 {
	padding: 10rpx;
	.moeny {
		margin-top: 10rpx;
		.new {
			color: red;
			font-size: 36rpx;
		}
		.old {
			margin-left: 20rpx;
			font-size: 26rpx;
			text-decoration: line-through;
			color: #ccc;
		}
	}
	.title {
		margin: 20rpx 0;
	}
	.line {
		border-bottom: 2px solid #ccc;
	}
	.type {
		view:nth-child(1) {
			margin: 15rpx 0;
		}
		view:nth-child(2) {
			margin-bottom: 15rpx;
		}
	}
}
.box3 {
	margin-bottom: 50rpx;
	padding: 0 10rpx 10rpx;
	line-height: 50rpx;
	font-size: 32rpx;
	.detail {
		font-size: 34rpx;
		padding: 5rpx 0;
	}
	.gomeImgLoad{
		width: 100%;
		height: 100%;
	}
}
.shop {
	position: fixed;
	width: 750rpx;
	bottom: 0;
}
</style>
