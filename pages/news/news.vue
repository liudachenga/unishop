<template>
	<view>
		<view v-for="(item, i) in message" :key="item.id" class="dad" @click="getNewsInfo(item.id)">
			<image :src="item.img_url" mode="widthFix"></image>
			<view class="right">
				<view class="title">{{ item.title }}</view>
				<view class="name">
					<text>{{ item.add_time | format('yyyy-MM-dd hh:mm:ss') }}</text>
					<text>阅读:{{ item.click }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			// 资讯列表
			message: []
		};
	},
	onLoad() {
		// 获取资讯列表
		this.getMessage();
	},
	methods: {
		// 获取资讯列表
		async getMessage() {
			const res = await uni.get('/api/getnewslist');
			console.log(res);
			if (res[1].data.status !== 0) {
				uni.baseToast('获取资讯列表失败');
			}
			this.message = res[1].data.message;
			console.log(this.message);
		},
		// 点击跳转到资讯详情页
		getNewsInfo(id) {
			console.log(id)
			uni.navigateTo({
				url:'/pages/newsInfo/newsInfo?id='+id
			});
		}
	}
};
</script>

<style lang="less">
.dad {
	padding: 10rpx;
	display: flex;
	border-bottom: 1px solid red;
	image {
		width: 120px;
		height: 120px;
	}
	.right {
		padding: 10rpx;
		flex: 1;
		.titie {
			text-align: center;
		}
		.name {
			display: flex;
			font-size: 28rpx;
			justify-content: space-between;
			margin-top: 10rpx;
		}
	}
}
</style>
