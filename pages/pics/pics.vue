<template>
	<view class="dad">
		<!-- 左侧 -->
		<scroll-view :scroll-y="true" class="scroll-left">
			<view :class="i === index ? 'red' : ''" v-for="(item, i) in pics" :key="item.id" @click="getCates(i, item.id)">{{ item.title }}</view>
		</scroll-view>
		<!-- 右侧 -->
		<scroll-view :scroll-y="true" class="scroll-right">
			<view v-if="cates.length === 0">暂无数据</view>
			<view v-for="(item,i) in cates" class="item" :key="item.id">
				<image @click="look(i)" :src="item.img_url" mode="widthFix"></image>
				<view class="title">{{ item.title }}</view>
				<view class="zhaiyao">{{ item.zhaiyao }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 左侧图片分类列表
			pics: [],
			// 默认选中分类的索引
			index: 0,
			// 获取右侧数据
			cates: []
		};
	},
	onLoad() {
		// 获取左侧图片分类
		this.getPics();
	},
	methods: {
		// 获取左侧图片分类
		async getPics() {
			const res = await uni.get('/api/getimgcategory');
			console.log(res);
			if (res[1].data.status !== 0) {
				return uni.baseToast('图片分类请求失败');
			}
			this.pics = res[1].data.message;
			console.log(this.pics);
			this.getCates(4, this.pics[4].id);
		},
		// 点击左侧分类
		async getCates(i, id) {
			this.index = i;
			// 发起请求获取右侧分类
			const res = await uni.get('/api/getimages/' + id);
			console.log(res);
			if (res[1].data.status !== 0) {
				return uni.baseToast('图片分类请求失败');
			}
			this.cates = res[1].data.message;
			console.log(this.cates);
		},
		// 点击预览图片
		look(i){
			var urls = this.cates.map((item)=>{
				return item.img_url
			})
			console.log(urls)
			uni.previewImage({
				urls,
				current: i
			})
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
}
.dad {
	height: 100%;
	display: flex;
}
.scroll-left {
	height: 100%;
	width: 200rpx;
	border-right: 1px solid #ccc;
	view {
		width: 200rpx;
		line-height: 120rpx;
		height: 120rpx;
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
}
.red {
	background-color: red;
	color: #fff;
}
.scroll-right {
	width: 530rpx;
	margin: 0 auto;
	.item {
		image {
			margin-top: 10rpx;
		}
		.title {
			font-size: 32rpx;
			margin: 10rpx 0;
		}
		.zhaiyao {
			margin: 40rpx 0;
		}
	}
}
</style>
