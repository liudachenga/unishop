<template>
	<view>
		<view class="hotgoodsnav">
			<view class="item" v-for="item in goodsList" :key="item.id" @click="goGoodsDetail(item.id)">
				<image :src="item.img_url"></image>
				<view class="pic">
					<text class="newpic">{{ item.sell_price }}</text>
					<text class="oldpic">{{ item.market_price }}</text>
				</view>
				<view class="name">{{ item.title }}</view>
				<!-- <view class="type">{{ item.zhaiyao }}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['goodsList'],
	data() {
		return {
			
		};
	},
	onLoad() {
		
	},
	methods: {
		// 跳转到商品详情页
		goGoodsDetail(id){
			uni.navigateTo({
				url:'/pages/goodsDetail/goodsDetail?id='+id
			});
		}
	}
};
</script>

<style lang="less">
.hotgoodsnav {
	padding: 0 10rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.item {
		width: 360rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
		padding: 10rpx;
		box-sizing: border-box;
		image {
			width: 80%;
			height: 150px;
			// background-color: pink;
			display: block;
			margin: 0 auto;
		}
		.pic {
			margin: 10rpx 0;
			.newpic {
				color: #c41e00;
			}
			.oldpic {
				font-size: 24rpx;
				margin-left: 10rpx;
				text-decoration: line-through;
				color: #ccc;
			}
		}
		.name {
			font-size: 26rpx;
		}
		.type {
			font-size: 26rpx;
			margin-bottom: 20rpx;
		}
	}
}
</style>
