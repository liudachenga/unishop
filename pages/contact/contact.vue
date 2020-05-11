<template>
	<view>
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode="widthFix"></image>
		<view class="info">
			<view class="number" @click="call">联系电话: 400-618-8888(点击拨打)</view>
			<view class="adress">地址:浙江省杭州市西湖区紫荆花北路</view>
		</view>
		<map latitude="30.317937" longitude="120.096341" scale="12" :markers="covers"></map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 地图上的图片
			covers: [
				{
					latitude: 30.311983,
					longitude: 120.089401,
					iconPath: '../../static/123456.png',
					width: 50,
					height: 50
				}
			]
		};
	},
	methods: {
		// 点击拨打电话
		call() {
			uni.makePhoneCall({
			    phoneNumber: '400-618-8888'
			});
		}
	}
};
</script>

<style lang="less">
.img {
	width: 100%;
}
.info {
	padding: 10rpx;
	.number {
		font-size: 30rpx;
		padding: 15rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.adress {
		font-size: 30rpx;
		padding: 15rpx 0;
	}
}
map {
	width: 100%;
	height: 750rpx;
}
</style>
